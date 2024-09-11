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
import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");
const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
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
async function ListStudents() {
  return await axios
    .get(`${apiUrl}/list-student`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
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
    .post(`${apiUrl}/create-repair`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
    
}
/*
async function GetIDByStudentID(id: string | null) {
  const requestOptions = {
    method: "GET",
  };
  let res = await fetch(`${apiUrl}/get-id-student/${id}`, requestOptions);

  if (res.status == 200) {
    return res.json(); // ถ้าสถานะเป็น 200 ให้คืนค่า JSON ที่มี id
  } else {
    return false; // ถ้าไม่ใช่ 200 ให้คืนค่า false
  }
}
*/

async function GetRepair(id: string | undefined) {
  return await axios
    .get(`${apiUrl}/get-repair/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}


async function GetListRepairs() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/get-list-repair`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}

async function UpdateRepair(data: RepairInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/update-repair`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}
//---------------------   DelayedPaymentForm ---------------------------------
async function DelayedPaymentFormUI(data: RepairInterface) {
  return await axios
    .post(`${apiUrl}/create-delayedpaymentform`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetDelayedPaymentForm(id: string) {
  return await axios
    .get(`${apiUrl}/get-delayedpaymentform/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function ListDelayedPaymentForms() {
  return await axios
    .get(`${apiUrl}/list-delayedpaymentform`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateDelayedPaymentForm(id: string, data: RepairInterface) {
  return await axios
    .put(`${apiUrl}/update-delayedpaymentform/${id}`, data, requestOptions)
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
//-------------slip--------------------------------------------------------------------------------------------------------------

async function CreateSlip(data: SlipInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/slip`, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return false;
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    return false;
  }
}




async function GetSlip(id: number | undefined) {
  if (id === undefined) {
    console.error('Invalid ID');
    return false;
  }

  try {
    const response = await fetch(`${apiUrl}/slip/${id}`, { method: "GET" });

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Error fetching slip:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Network error:', error);
    return false;
  }
}


async function GetListSlips() {
  try {
    const response = await fetch(`${apiUrl}/slip`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Error fetching slips list:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Network error:', error);
    return false;
  }
}


async function UpdateSlip(data: SlipInterface) {
  try {
    const response = await fetch(`${apiUrl}/slip`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Error updating slip:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Network error:', error);
    return false;
  }
}


export {
  SignInStudent,
  SignInAdmin,
  ListStudents,
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
  //---------------Slip-------------
  CreateSlip,
  GetSlip,
  GetListSlips,
  UpdateSlip,
};