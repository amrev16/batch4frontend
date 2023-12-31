// import { METHODS } from "http";
import Cookies from "js-cookie";
import { API_PATHS, HTTP_METHODS } from "../const";
import { IEmployee } from "../types/employee";
import { ILoanedItems } from "../types/IloanedItems";
import { ILoan } from "../types/loan";
import { ISignInRes } from "../types/siginInRes.d";

// #################### Employee ###############################
export async function getAllEmployees() : Promise<IEmployee[]> {
  var myHeaders = new Headers();
  const token = Cookies.get('bearer-token') || ''
  myHeaders.append("Authorization", `Bearer ${token}`);
  const response = await fetch(API_PATHS.GET_ALL_EMPLOYEES, {
    method: HTTP_METHODS.GET,
    headers: myHeaders
  })
  const employees = await response?.json();
  if(response.ok)
    return employees as IEmployee[];
  else throw new Error(`${employees.message} [${response.status}]`);
}

export async function createEmployee(customer: IEmployee & {password: string}) : Promise<IEmployee> {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const token = Cookies.get('bearer-token') || ''
  myHeaders.append("Authorization", `Bearer ${token}`);
  const body = JSON.stringify({
    name: customer.name,
    password: customer.password,
    department: customer.department,
    designation: customer.designation,
    gender: customer.gender ? customer.gender[0] : 'm', 
    dob: customer.dob,
    doj: customer.doj
  })
  const response = await fetch(API_PATHS.CREATE_EMPLOYEE, {
    method: HTTP_METHODS.POST,
    headers: myHeaders,
    body: body,
    redirect: 'follow'
  }) 
  const employee = await response.json();
  if(response.ok)
    return employee as IEmployee;
  else throw new Error(`${employee.message} [${response.status}]`);
}

export async function deleteEmployee(empId: string): Promise<string> {
  var headers = new Headers();
  const token = Cookies.get('bearer-token') || ''
  headers.append("Authorization", `Bearer ${token}`);
  const response = await fetch(API_PATHS.DELETE_EMPLOYEE + empId, {
    method: HTTP_METHODS.DELETE,
    headers: headers,
    redirect: 'follow'
  })

  if(response.ok) {
    const status = await response.text();
    return status as string;
  }
  else {
    const status = await response.json();
    throw new Error(`${status.message} [${response.status}]`);
  }
}

export async function editEmployee(customer: IEmployee, empId: string) : Promise<IEmployee> {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const token = Cookies.get('bearer-token') || ''
  myHeaders.append("Authorization", `Bearer ${token}`);
  const body = JSON.stringify({
    name: customer.name,
    department: customer.department,
    designation: customer.designation,
    gender: customer.gender ? customer.gender[0] : 'm', 
    dob: customer.dob,
    doj: customer.doj
  })
  const response = await fetch(API_PATHS.EDIT_EMPLOYEE + empId, {
    method: HTTP_METHODS.PATCH,
    headers: myHeaders,
    body: body,
    redirect: 'follow'
  }) 
  const employee = await response.json();
  if(response.ok)
    return employee as IEmployee;
  else throw new Error(`${employee.message} [${response.status}]`)
}

export async function getEmployeeById(empId: string) : Promise<IEmployee> {
  const myHeaders = new Headers();
  const token = Cookies.get('bearer-token') || ''
  myHeaders.append("Authorization", `Bearer ${token}`);
  const response = await fetch(API_PATHS.GET_EMPLOYEE_BY_ID + empId, {
    method: HTTP_METHODS.GET,
    headers: myHeaders
  })
  const employee = await response?.json();
  
  if(response.ok)
    return employee as IEmployee;
  else throw new Error(`${employee.message} [${response.status}]`);
}

export async function getLoanedItemsByEmployee() : Promise<ILoanedItems[]> {
  const headers = new Headers();
  const token = Cookies.get('bearer-token') || '';
  headers.append("Authorization", `Bearer ${token}`);
  const response = await fetch(API_PATHS.GET_LOANED_ITEMS, {
    method: HTTP_METHODS.GET,
    headers: headers
  });

  const loanedItems = await response?.json();
  if(response.ok)
    return loanedItems as ILoanedItems[];
  else throw new Error(`${loanedItems.message} [${response.status}]`);

}

export async function PurchaseNewItem(itemId: string) : Promise<{issueId: string}>{
  const headers = new Headers();
  const token = Cookies.get('bearer-token') || '';
  headers.append('Authorization', `Bearer ${token}`);
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    itemId: itemId
  })
  const response = await fetch(API_PATHS.LOAN_NEW_ITEM, {
    method: HTTP_METHODS.POST,
    headers: headers,
    body: raw
  })
  const issueId = await response?.json();
  if(response.ok)
    return issueId as {issueId: string};
  else throw new Error(`${issueId.message} [${response.status}]`);
}


///######################## loans #########################
export async function getAllLoans() : Promise<ILoan[]> {
  const myHeaders = new Headers();
  const token = Cookies.get('bearer-token') || ''
  myHeaders.append("Authorization", `Bearer ${token}`);
  const response = await fetch(API_PATHS.GET_ALL_LOANS, {
    method: HTTP_METHODS.GET,
    headers: myHeaders,
  })
  const loans = await response?.json();
  if(response.ok)
    return loans as ILoan[];
  else throw new Error(`${loans.message} [${response.status}]`);
}

export async function createLoan(card: ILoan) : Promise<ILoan> {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const token = Cookies.get('bearer-token') || ''
  myHeaders.append("Authorization", `Bearer ${token}`);
  const body = JSON.stringify({
    loanType: card.loanType,
    durationInYears: card.durationInYears
  })
  const response = await fetch(API_PATHS.CREATE_LOAN, {
    method: HTTP_METHODS.POST,
    headers: myHeaders,
    body: body,
    redirect: 'follow'
  }) 
  const loan = await response.json();
  if(response.ok)
    return loan as ILoan;
  else throw new Error(`${loan.message} [${response.status}]`)
}

export async function deleteLoan(loanID: string): Promise<string> {
  var headers = new Headers();
  const token = Cookies.get('bearer-token') || ''
  headers.append("Authorization", `Bearer ${token}`);
  const response = await fetch(API_PATHS.DELETE_LOAN + loanID, {
    method: HTTP_METHODS.DELETE,
    headers: headers,
    redirect: 'follow'
  })
  if(response.ok){
    const status = await response.text();
    return status as string;
  }
  else{
    const status = await response.json();
    throw new Error(status.message + ` [${response.status}]`)
  }
}

export async function editLoan(card: ILoan, loanID: string) : Promise<ILoan> {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const token = Cookies.get('bearer-token') || ''
  myHeaders.append("Authorization", `Bearer ${token}`);
  const body = JSON.stringify({
    loanType: card.loanType,
    durationInYears: card.durationInYears
  })
  const response = await fetch(API_PATHS.EDIT_LOAN + loanID, {
    method: HTTP_METHODS.PATCH,
    headers: myHeaders,
    body: body,
    redirect: 'follow'
  }) 
  const loan = await response.json();
  if(response.ok){
    return loan as ILoan;
  }
  else throw new Error(loan.message + `[${response.status}]`)
}

export async function getLoanById(loanID: string) : Promise<ILoan> {
  const myHeaders = new Headers();
  const token = Cookies.get('bearer-token') || ''
  myHeaders.append("Authorization", `Bearer ${token}`);
  const response = await fetch(API_PATHS.GET_LOAN_BY_ID + loanID, {
    method: HTTP_METHODS.GET,
    headers: myHeaders
  });
  const loan = await response?.json();
  if(response.ok) {
    return loan as ILoan;
  }
  else throw new Error(loan.message + `[${response.status}]`)
}

// ##################### AUTH #################
export async function signIn(username: string, password: string) : Promise<ISignInRes>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const token = Cookies.get('bearer-token') || ''
  myHeaders.append("Authorization", `Bearer ${token}`);
  var raw = JSON.stringify({
    username,
    password
  });


  const res = await fetch(API_PATHS.SIGN_IN, {
    method: HTTP_METHODS.POST,
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
  const signInRes = await res.json();
  if(res.ok){
    return signInRes as ISignInRes;
  }
  else throw new Error(signInRes.message + ` [${res.status}]`)
}

