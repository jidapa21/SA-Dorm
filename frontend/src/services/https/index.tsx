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
import { ExpenseInterface } from '../../interfaces/Expense'; // ปรับเส้นทางให้ตรงกับที่อยู่จริง
import { RentInterface } from "../../interfaces/Rentfee";
import { ElectricityInterface } from "../../interfaces/Electricityfee";
import { WaterInterface } from "../../interfaces/Waterfee";


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

async function GetRepair(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };
  let res = await fetch(`${apiUrl}/get-repair/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
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
  let res = await fetch(`${apiUrl}/update-repair/:id`, requestOptions)
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
  return await axios
  .post(`${apiUrl}/create-slip`, data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}


  async function GetSlip(id: number | undefined) {
    return await axios
    .get(`${apiUrl}/get-slip/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}


 

async function GetListSlips() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/get-list-slip`, requestOptions)
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
  let res = await fetch(`${apiUrl}/update-slip`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
}
  
//-------------------------Expense----------------------------------------

async function CreateExpense(data: ExpenseInterface) {
  return await axios
  .post(`${apiUrl}/create-expense`, data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
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

//-----------------------------Rentfee-------------------------------------

async function ListRentFees() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`/list-rentfees`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  return res;
  }
        
  
  async function  CreateRentFee(data: RentInterface) {
    return await axios
    .post(`/create-rentfee`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
  }
  
  async function GetRentFee() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`/get-rentfee/:id`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
    return res;
  }

  
  //----------------------------------------------Electricity-------------------------------------
async function ListElectricityFees() {
const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
let res = await fetch(`/list-electricityfees`, requestOptions)
  .then((res) => {
    if (res.status == 200) {
      return res.json();
    } else {
      return false;
    }
  });
return res;
}


async function  CreateElectricityFee(data: ElectricityInterface) {
  return await axios
  .post(`/create-electricityfee`, data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}
  
  async function GetElectricityFee() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`/get-electricityfee/:id`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
    return res;
  }

  async function UpdateElectricityFee(data: SlipInterface) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let res = await fetch(`update-electricityfee/:id`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
    return res;
  }
//----------------------------------------water fee-------------------------------------------
        
async function ListWaterFees() {
const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
let res = await fetch(`/list-waterfees`, requestOptions)
  .then((res) => {
    if (res.status == 200) {
      return res.json();
    } else {
      return false;
    }
  });
return res;
}

async function  CreateWaterFee(data: WaterInterface) {
  return await axios
  .post(`/create-waterfee`, data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
}

async function GetWaterFee() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`/get-waterfee/:id`, requestOptions)
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
  //------------------------Slip-------------
  CreateSlip,
  GetSlip,
  GetListSlips,
  UpdateSlip,
  //-------------------------expense----------------
  fetchExpenses,
  CreateExpense,
  ListExpense,
  //-----------------------Elecfee---------------
  ListElectricityFees,
  CreateElectricityFee,
  GetElectricityFee,
  UpdateElectricityFee,
  //------------------------Waterfee-------------
  ListWaterFees,
  CreateWaterFee,
  GetWaterFee,
  //---------------------------Rentfee---------------
  ListRentFees,
  CreateRentFee,
  GetRentFee,

};