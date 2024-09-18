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
import { GenderInterface } from "../../interfaces/gender";
import { ExpenseInterface } from "../../interfaces/Expense";
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

async function GetListFormStudent() {
  try {
    const response = await fetch(`${apiUrl}/get-list-formstudent`, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      // แสดงข้อความข้อผิดพลาดจาก API หากมี
      const errorData = await response.json();
      return { data: errorData };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return { status: 500, data: { error: "Fetch error" } };
  }
}

async function CreateRepair(data: RepairInterface) {
  return await axios
    .post(`${apiUrl}/create-repair`, data, requestOptions)
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

//---------------------   DelayedPaymentForm ---------------------------------
async function CreateDelayedPaymentForm(data: DelayedPaymentFormInterface) {
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
    .catch((e) => e.response);
  }
//---------------------   Status ---------------------------------
async function GetStatusById(id: number) {
  return await axios
    .get(`${apiUrl}/get-status/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetListStatus() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Authorization}`, // ตรวจสอบว่า Authorization header ถูกต้อง
    },
  };

  try {
    const response = await fetch(`${apiUrl}/list-status`, requestOptions);
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

//---------------------   Admin ---------------------------------
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
  GetListFormStudent,
  CreateRepair,
  GetRepair,
  GetListRepairs,
  UpdateRepair,
  // ----------------- DelayedPaymentForm --------------
  CreateDelayedPaymentForm,
  GetDelayedPaymentForm,
  ListDelayedPaymentForms,
  UpdateDelayedPaymentForm,
  // ----------------- En_ExitingForm --------------
  CreateEn_ExitingForm,
  GetEn_ExitingForm,
  ListEn_ExitingForm,
  UpdateEn_ExitingForm,
  // ----------------- ResigningForm --------------
  CreateResigningForm,
  GetResigningForm,
  ListResigningForm,
  UpdateResigningForm,
  // ----------------- Status --------------
  GetStatusById,
  GetListStatus,
  // ----------------- Announcements --------------
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
  Updateexpense,
};
