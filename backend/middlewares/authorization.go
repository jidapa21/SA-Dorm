package middlewares

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"dormitory.com/dormitory/services"
	"github.com/gin-gonic/gin"
)

var HashKey = []byte("very-secret")
var BlockKey = []byte("a-lot-secret1234")

func Authorizes() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.Request.Header.Get("Authorization")
		if clientToken == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No Authorization header provided"})
			return
		}

		extractedToken := strings.Split(clientToken, "Bearer ")
		if len(extractedToken) != 2 {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Incorrect Format of Authorization Token"})
			return
		}

		clientToken = strings.TrimSpace(extractedToken[1])

		jwtWrapper := services.JwtWrapper{
			SecretKey: "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:    "AuthService",
		}

		claims, err := jwtWrapper.ValidateToken(clientToken)
		if err != nil {
			// Check if the error is due to an expired token
			if err.Error() == "Token is expired" {
				// Attempt to refresh the token
				newToken, refreshErr := refreshToken(clientToken, &jwtWrapper)
				if refreshErr != nil {
					c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": refreshErr.Error()})
					return
				}
				// Set the new token in the response header
				c.Header("New-Token", newToken)
				// Parse the new token to get the claims
				claims, _ = jwtWrapper.ValidateToken(newToken)
			} else {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
				return
			}
		}

		// Set claims in context
		if claims.StudentID != "" {
			c.Set("student_id", claims.StudentID)
		}
		if claims.AdminID != "" {
			c.Set("admin_id", claims.AdminID)
		}
		if claims.Username != "" {
			c.Set("username", claims.Username)
		}

		c.Next()
	}
}

func refreshToken(oldToken string, jwtWrapper *services.JwtWrapper) (string, error) {
	claims, err := jwtWrapper.ValidateToken(oldToken)
	if err != nil {
		return "", err
	}

	// Convert the Unix timestamp to time.Time
	issuedAt := time.Unix(claims.IssuedAt, 0)

	// Check if the token is not too old to be refreshed (e.g., not more than 7 days old)
	if time.Since(issuedAt) > 7*24*time.Hour {
		return "", errors.New("Token is too old to be refreshed")
	}

	// Create a new token
	newToken, err := jwtWrapper.GenerateToken(claims.StudentID, claims.AdminID, claims.Username)
	if err != nil {
		return "", err
	}

	return newToken, nil
}
