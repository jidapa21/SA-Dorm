import { StudentInterface } from "../../interfaces/Student";
import { SignInStudentInterface } from "../../interfaces/SignInStudent";
import { SignInAdminInterface } from "../../interfaces/SignInAdmin";
import { PersonalInterface } from "../../interfaces/Personal";
import { AddressInterface } from "../../interfaces/Address";
import { OtherInteface } from "../../interfaces/Other";
import { FamilyInterface } from "../../interfaces/Family";
import { PersonalDetailInterface } from "../../interfaces/PersonalDetails";
import { SlipInterface } from "../../interfaces/slip";
import { RepairInterface } from "../../interfaces/repairing";
import { ResigningFormInterface } from "../../interfaces/ResigningForm";
import { DelayedPaymentFormInterface } from "../../interfaces/delayedpaymentform";
import { En_ExitingFormInterface } from "../../interfaces/En_ExitingForm";
import { AnnouncementInterface } from "../../interfaces/Announcement";
import { AadminInterface } from "../../interfaces/Admin";
import axios, { AxiosError } from 'axios';


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
//Student
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
//PersonalDetails-----------------------------

async function CreatePersonalDetail(data: PersonalDetailInterface) {
  return await axios
  .post(`${apiUrl}/create-personal-detail`, data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}

async function GetPersonalById(id: string) {
  return await axios
  .get(`${apiUrl}/get-personal/${id}`, requestOptions)
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

async function UpdatePersonalById(id: string, data: PersonalInterface) {
  return await axios
    .put(`${apiUrl}/update-personal/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateAddressById(id: string, data: AddressInterface) {
  return await axios
    .put(`${apiUrl}/update-address/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateFamilyById(id: string, data: FamilyInterface) {
  return await axios
    .put(`${apiUrl}/update-family/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateOtherById(id: string, data: OtherInteface) {
  return await axios
    .put(`${apiUrl}/update-other/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
//---------------------   Repairing ---------------------------------

async function CreateRepair(data: RepairInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/creat-repair`, requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
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
      const response = await fetch(`${apiUrl}/repair/${id}`, requestOptions);
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
        "Authorization": `${Bearer} ${Authorization}` // เพิ่ม Authorization header หากต้องการ
      }
    };
  
    try {
      const response = await fetch(`${apiUrl}/repair-getlist`, requestOptions);
      if (response.ok) {
        return await response.json();
      } else {
        console.error(`Error: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return false;
    }
  }
  
  async function UpdateRepair(id: string, data: Partial<RepairInterface>) {
    return await axios
      .put(`${apiUrl}/repair-update/${id}`, data, requestOptions) // Ensure PUT is used
      .then((res) => res)
      .catch((e) => e.response);
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

async function GetLatestAnnouncement() {
  return await axios
    .get(`${apiUrl}/get-latest-announcement`, requestOptions)
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
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/repair`, requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
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
    },
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

export {
  SignInStudent,
  SignInAdmin,
  ListStudents,
  GetStudentsById,
  UpdateStudentsById,
  DeleteStudentsById,
  CreateStudent,
  CreatePersonalDetail,
  GetPersonalById,
  GetAddressById,
  GetFamilyById,
  GetOtherById,
  UpdatePersonalById,
  UpdateAddressById,
  UpdateFamilyById,
  UpdateOtherById,
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
  GetLatestAnnouncement,
  Adminlist,
  CreateAdmin,
  DeleteAdmin,
  //---------------Slip-------------
  CreateSlip,
  GetSlip,
  GetListSlips,
  UpdateSlip,
};