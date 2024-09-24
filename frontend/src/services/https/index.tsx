import { StudentInterface } from "../../interfaces/Student";
import { SignInStudentInterface } from "../../interfaces/SignInStudent";
import { SignInAdminInterface } from "../../interfaces/SignInAdmin";
import { PersonalInterface } from "../../interfaces/Personal";
import { PersonalDetailInterface } from "../../interfaces/PersonalDetails";
import { SlipInterface } from "../../interfaces/Slip";
import { RepairInterface } from "../../interfaces/repairing";
import { ResigningFormInterface } from "../../interfaces/ResigningForm";
import { DelayedPaymentFormInterface } from "../../interfaces/delayedpaymentform";
import { En_ExitingFormInterface } from "../../interfaces/En_ExitingForm";
import { AnnouncementInterface } from "../../interfaces/Announcement";
import { AadminInterface } from "../../interfaces/Admin";
import { GenderInterface } from "../../interfaces/gender";
import { ExpenseInterface } from "../../interfaces/Expenes";
import { ReservationInterface } from "../../interfaces/Reservation";
import axios from "axios";
import { RoomInterface } from "../../interfaces/Room";
import { DormInterface } from "../../interfaces/Dorm";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");
const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("token_type");
  return {
    "Content-Type": "application/json",
    Authorization: tokenType ? `${tokenType} ${token}` : undefined,
  };
};


async function SignInStudent(data: SignInStudentInterface) {
  return await axios
    .post(`${apiUrl}/signin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function SignInAdmin(data: SignInAdminInterface) {
  return await axios
    .post(`${apiUrl}/signin-admin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetAdminByID(id: number) {
  try {
    const response = await axios.get(`${apiUrl}/admin/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin data', error);
    throw new Error('Error fetching admin data');
  }
}
async function ListStudents() {
  return await axios
    .get(`${apiUrl}/list-student`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function Getgender() {
  try {
      const response = await axios.get(`${apiUrl}/get-gender`, requestOptions);
      console.log('Response from Getgender:', response.data); // ตรวจสอบข้อมูลที่ได้รับ
      return response.data;
  } catch (error) {
      console.error('Error fetching genders:', error);
      throw error;
  }
}
async function GetStudentsById(id: string) {
  return await axios
    .get(`${apiUrl}/get-student/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateStudentsById(id: string, data: StudentInterface) {
  return await axios
    .put(`${apiUrl}/update-student/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function DeleteStudentsById(id: string) {
  return await axios
    .delete(`${apiUrl}/delete-student/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateStudent(data: StudentInterface) {
  return await axios
    .post(`${apiUrl}/create-student`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function ListPersonal() {
  return await axios
    .get(`${apiUrl}/list-personal`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdatePersonalById(id: string, data: PersonalInterface) {
  return await axios
    .put(`${apiUrl}/update-personal/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetPersonalById(id: string) {
  return await axios
    .get(`${apiUrl}/get-personal/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreatePersonalDetail(data: PersonalDetailInterface) {
  return await axios
    .post(`${apiUrl}/create-personal-detail`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function ListAddress() {
  return await axios
    .get(`${apiUrl}/list-address`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function ListFamily() {
  return await axios
    .get(`${apiUrl}/list-family`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function ListOther() {
  return await axios
    .get(`${apiUrl}/list-other`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetAddressById(id: string) {
  return await axios
    .get(`${apiUrl}/get-address/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetFamilyById(id: string) {
  return await axios
    .get(`${apiUrl}/get-family/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetOtherById(id: string) {
  return await axios
    .get(`${apiUrl}/get-other/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

//---------------------   Repairing ---------------------------------

  async function CreateRepair(data: RepairInterface) {
    return await axios
      .post(`${apiUrl}/creat-repair`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }
  async function GetRepair(id: number | undefined) {
    if (id === undefined) {
      throw new Error('ID cannot be undefined');
    }
  
    const Authorization = localStorage.getItem("token");
    const Bearer = localStorage.getItem("token_type");
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${Bearer} ${Authorization}` // ตรวจสอบว่า Authorization header ถูกต้อง
      }
    };
  
    try {
      const response = await fetch(`${apiUrl}/get-repair/${id}`, requestOptions);
      if (response.ok) {
        return await response.json();
      } else {
        // ตรวจสอบรายละเอียดของข้อผิดพลาด
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        return false;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return false;
    }
  }
  
  
  
  async function GetListRepairs() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Authorization}` // เพิ่ม Authorization header หากต้องการ
      }
    };
  
    try {
      const response = await fetch(`${apiUrl}/repair-getlist`, requestOptions);
      if (response.ok) {
        return await response.json();
      } else if (response.status === 401) {
        console.error('Error 401: Unauthorized - ตรวจสอบ Token และการอนุญาต');
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
      return false;
    } catch (error) {
      console.error('Fetch error:', error);
      return false;
    }
  }
  
  async function UpdateRepair(id: string, data: Partial<RepairInterface>) {
    return await axios
      .put(`${apiUrl}/repair-update/${id}`, data, requestOptions) // ใช้ URL ใหม่
      .then((res) => res)
      .catch((e) => e.response);
}
  //---------------------   En_ExitingForm ---------------------------------
  async function CreateEn_ExitingForm(data: En_ExitingFormInterface) {
    return await axios
      .post(`${apiUrl}/create-en_exitingform`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
  }

  async function GetEn_ExitingForm(id: number | undefined) {
    if (id === undefined) {
      throw new Error('ID cannot be undefined');
    }
  
    const Authorization = localStorage.getItem("token");
    const Bearer = localStorage.getItem("token_type");
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${Bearer} ${Authorization}` // ตรวจสอบว่า Authorization header ถูกต้อง
      }
    };
  
    try {
      const response = await fetch(`${apiUrl}/get-En_ExitingForm/${id}`, requestOptions);
      if (response.ok) {
        return await response.json();
      } else {
        // ตรวจสอบรายละเอียดของข้อผิดพลาด
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        return false;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return false;
    }
  }
  
  
  
  async function ListEn_ExitingForm() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Authorization}` // เพิ่ม Authorization header หากต้องการ
      }
    };
  
    try {
      const response = await fetch(`${apiUrl}/En_ExitingForm-getlist`, requestOptions);
      if (response.ok) {
        return await response.json();
      } else if (response.status === 401) {
        console.error('Error 401: Unauthorized - ตรวจสอบ Token และการอนุญาต');
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
      return false;
    } catch (error) {
      console.error('Fetch error:', error);
      return false;
    }
  }
  
  async function UpdateEn_ExitingForm(id: string, data: Partial<En_ExitingFormInterface>) {
    return await axios
      .put(`${apiUrl}/En_ExitingForm-update/${id}`, data, requestOptions) // ใช้ URL ใหม่
      .then((res) => res)
      .catch((e) => e.response);
} 
//---------------------   ResigningForm ---------------------------------
async function CreateResigningForm(data: ResigningFormInterface) {
  return await axios
    .post(`${apiUrl}/create-resigningform`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetResigningForm(id: number | undefined) {
  if (id === undefined) {
    throw new Error('ID cannot be undefined');
  }

  const Authorization = localStorage.getItem("token");
  const Bearer = localStorage.getItem("token_type");
  
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${Bearer} ${Authorization}` // ตรวจสอบว่า Authorization header ถูกต้อง
    }
  };

  try {
    const response = await fetch(`${apiUrl}/get-ResigningForm/${id}`, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      // ตรวจสอบรายละเอียดของข้อผิดพลาด
      const errorText = await response.text();
      console.error(`Error: ${response.status} - ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return false;
  }
}

async function CreateDelayedPaymentForm(data: DelayedPaymentFormInterface) {
  return await axios
    .post(`${apiUrl}/create-delayedpaymentform`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function ListResigningForm() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Authorization}` // เพิ่ม Authorization header หากต้องการ
    }
  };

  try {
    const response = await fetch(`${apiUrl}/Resigningform-getlist`, requestOptions);
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      console.error('Error 401: Unauthorized - ตรวจสอบ Token และการอนุญาต');
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
    return false;
  } catch (error) {
    console.error('Fetch error:', error);
    return false;
  }
}

async function UpdateResigningForm(id: number, data: Partial<ResigningFormInterface>) {
  return await axios
    .put(`${apiUrl}/Resigningform-update/${id}`, data, requestOptions) // ใช้ URL ใหม่
    .then((res) => res)
    .catch((e) => e.response);}
//---------------------   DelayedPaymentForm ---------------------------------
async function DelayedPaymentFormUI(data: DelayedPaymentFormInterface) {
  return await axios
    .post(`${apiUrl}/create-delayedpaymentform`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetDelayedPaymentForm(id: number | undefined) {
  if (id === undefined) {
    throw new Error('ID cannot be undefined');
  }

  const Authorization = localStorage.getItem("token");
  const Bearer = localStorage.getItem("token_type");
  
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${Bearer} ${Authorization}` // ตรวจสอบว่า Authorization header ถูกต้อง
    }
  };

  try {
    const response = await fetch(`${apiUrl}/get-delayedpaymentform/${id}`, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      // ตรวจสอบรายละเอียดของข้อผิดพลาด
      const errorText = await response.text();
      console.error(`Error: ${response.status} - ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return false;
  }
}

async function ListDelayedPaymentForms() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Authorization}` // เพิ่ม Authorization header หากต้องการ
    }
  };

  try {
    const response = await fetch(`${apiUrl}/list-delayedpaymentform`, requestOptions);
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      console.error('Error 401: Unauthorized - ตรวจสอบ Token และการอนุญาต');
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
    return false;
  } catch (error) {
    console.error('Fetch error:', error);
    return false;
  }
}

async function UpdateDelayedPaymentForm(id: string, data: Partial<RepairInterface>) {
  return await axios
    .put(`${apiUrl}/update-delayedpaymentform/${id}`, data, requestOptions) // ใช้ URL ใหม่
    .then((res) => res)
    .catch((e) => e.response);
}
async function Adminlist() {
  return await axios
    .get(`${apiUrl}/GetAllAdmins`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateAdmin(data: AadminInterface) {
  return await axios
    .post(`${apiUrl}/create-admin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function DeleteAdmin(id: number) {
  try {
    const response = await axios.delete(`${apiUrl}/admin/${id}`, requestOptions);
    return response;
  } catch (error) {
    console.error('Error deleting admin:', error);
    throw error;
  }
} async function ListAnnouncements() {
  return await axios
    .get(`${apiUrl}/list-announcement`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetAnnouncementById(id: string) {
  return await axios
    .get(`${apiUrl}/get-announcement/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateAnnouncement(data: AnnouncementInterface) {
  return await axios
    .post(`${apiUrl}/create-announcement`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateAnnouncementById(id: string, data: AnnouncementInterface) {
  return await axios
    .put(`${apiUrl}/update-announcement/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteAnnouncementById(id: string) {
  return await axios
    .delete(`${apiUrl}/delete-announcement/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
//-------------slip------------------

async function CreateSlip(data: SlipInterface) {
  return await axios
  .post(`${apiUrl}/create-slip`, data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}

async function GetSlip(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };
  let res = await fetch(`${apiUrl}/slip/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}

async function GetListSlips() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Authorization}` // เพิ่ม Authorization header หากต้องการ
    },
  };
  let res = await fetch(`${apiUrl}/list-slip`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}

async function UpdateSlip(data: SlipInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/slip`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}
async function Updateexpense(id: number, data: Partial<ExpenseInterface>) {
  return await axios
    .put(`${apiUrl}/update-expense/${id}`, data, requestOptions) // ใช้ URL ใหม่
    .then((res) => res)
    .catch((e) => e.response);}

async function Getslipcompleted() {
  const requestOptions = {
     method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Authorization}` // เพิ่ม Authorization header หากต้องการ
      },
    };
    let res = await fetch(`${apiUrl}/get-slipcomplete`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
    return res;
  }
  async function CreateExpense(data: ExpenseInterface) {
    return await axios
    .post(`${apiUrl}/create-expense`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
  }
  async function fetchExpenses(): Promise<ExpenseInterface[]> {
    try {
      const response = await fetch('/api/expenses');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ExpenseInterface[] = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
      return []; // คืนค่าเป็นอาร์เรย์เปล่าหากเกิดข้อผิดพลาด
    }
  }
  async function ListExpense() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Authorization}`, // ตรวจสอบว่า Authorization header ถูกต้อง
      },
    };
  
    try {
      const response = await fetch(`${apiUrl}/list-expense`, requestOptions);
      if (response.ok) {
        return await response.json();
      } else {
        // แสดงข้อความข้อผิดพลาดจาก API หากมี
        const errorData = await response.json();
        return { status: response.status, data: errorData };
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return { status: 500, data: { error: "Fetch error" } };
    }
  }
//------------Dorm------------//
async function GetDorm(id: number) {
  return await axios
    .get(`${apiUrl}/GetDorm/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function ListDorms(data: DormInterface) {
  return await axios
    .post(`${apiUrl}/ListDorms`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateDorm(id: number) {
  return await axios
    .put(`${apiUrl}/UpdateDorm/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

//------------Room------------//
async function GetRoom(id: number) {
  return await axios
    .get(`${apiUrl}/GetRoom/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetRoomsByFloorAndDorm(floorId: number, dormId: number) {
  try {
    const response = await axios.get(`${apiUrl}/rooms/floor/${floorId}/dorm/${dormId}`, requestOptions);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) { 
      return { error: error.response ? error.response.data : "An error occurred" };
    }
    return { error: "An unknown error occurred" }; 
  }
}

async function ListRoom(data: RoomInterface) {
  return await axios
    .post(`${apiUrl}/ListRoom`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function DeleteRoom(id: number) {
  return await axios
    .delete(`${apiUrl}/DeleteRoom/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateRoom(id: number) {
  return await axios
    .put(`${apiUrl}/UpdateRoom/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
  //------------Reservation------------//
export const CreateReservation = async (data: ReservationInterface) => {
  
  try {
      const response = await axios.post(`${apiUrl}/CreateReservation`, data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Authorization}` // เพิ่ม Authorization header หากจำเป็น
        },
      });
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.message || "Error creating reservation");
      }
      throw new Error("Error creating reservation");
  }
};

async function GetReservationsByRoomID(roomID: number) {
  try {
    const response = await axios.get(`${apiUrl}/reservations/room/${roomID}`, requestOptions);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response ? error.response.data : "An error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
}

async function DeleteReservation(id: number) {
  return await axios
    .delete(`${apiUrl}/DeleteReservation/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateReservation(id: number) {
  return await axios
    .put(`${apiUrl}/UpdateReservation/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetStudentsByRoomID(roomID: number) {
  try {
    const response = await axios.get(`${apiUrl}/reservations/${roomID}/students`, requestOptions);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response ? error.response.data : "An error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
}

async function GetUserRoom(userID: number) {
  try {
    const response = await axios.get(`${apiUrl}/check-user-room/${userID}`, requestOptions);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response ? error.response.data : "An error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
}

async function getStudentGender(studentId: string): Promise<string> {
  try {
    // ทำการเรียก API เพื่อนำข้อมูลเพศของนักเรียน
    const response = await fetch(`/api/students/${studentId}/gender`);
    
    // ตรวจสอบว่า API ตอบกลับด้วยสถานะที่ถูกต้อง
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const data = await response.json();
    
    // ส่งคืนข้อมูลเพศ
    return data.gender; // ค่าที่ส่งคืนเป็น "male" หรือ "female"
  } catch (error) {
    console.error("Error fetching student gender:", error);
    throw error; // โยนข้อผิดพลาดเพื่อให้สามารถจัดการได้ที่ชั้นสูงกว่า
  }
}
  
  

export {
  SignInStudent,
  SignInAdmin,
  GetAdminByID,
  ListStudents,
  Getgender,
  GetStudentsById,
  UpdateStudentsById,
  DeleteStudentsById,
  CreateStudent,
  CreatePersonalDetail,
  ListPersonal,
  UpdatePersonalById,
  GetPersonalById,
  ListAddress,
  ListFamily,
  ListOther,
  GetAddressById,
  GetFamilyById,
  GetOtherById,
  // ----------------- Repairing --------------
  CreateRepair,
  GetRepair,
  GetListRepairs,
  UpdateRepair,
  // ----------------- DelayedPaymentForm --------------
  DelayedPaymentFormUI,
  GetDelayedPaymentForm,
  ListDelayedPaymentForms,
  UpdateDelayedPaymentForm,
  ListAnnouncements,
  GetAnnouncementById,
  CreateAnnouncement,
  UpdateAnnouncementById,
  DeleteAnnouncementById,
  Adminlist,
  CreateAdmin,
  DeleteAdmin,
  CreateSlip,
  GetSlip,
  GetListSlips,
  UpdateSlip,
  GetEn_ExitingForm,
  ListEn_ExitingForm,
  UpdateEn_ExitingForm,
  GetResigningForm,
  ListResigningForm,
  UpdateResigningForm,
  Updateexpense,
  Getslipcompleted,
  CreateEn_ExitingForm,
  CreateResigningForm,
  CreateDelayedPaymentForm,
  CreateExpense,
  fetchExpenses,
  ListExpense,
  GetRoomsByFloorAndDorm,
  GetReservationsByRoomID,GetDorm,ListDorms,UpdateDorm,GetRoom,ListRoom,DeleteRoom,UpdateRoom,DeleteReservation,UpdateReservation,GetStudentsByRoomID,GetUserRoom,getStudentGender
};