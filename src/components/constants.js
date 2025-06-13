export const FIELD_TYPES = {
  TEXT: 'TEXT',
  EMAIL: 'EMAIL',
  NUMBER: 'NUMBER',
  FILE: 'FILE',
  DATE: 'DATE',
  SELECT: 'SELECT',
  RADIO: 'RADIO',
  CHECKBOX: 'CHECKBOX'
};

export const PROFILE_MAPPINGS = {
  // From User Model
  USER_EMAIL: 'user.email',
  USER_PHONE: 'user.phoneNo',
  
  // From Profile Model
  FULL_NAME: 'profile.fullName',
  PHONE_NUMBER: 'profile.phoneNo',
  PAN_NUMBER: 'profile.panNo',
  AADHAR_NUMBER: 'profile.aadharNo',
  
  // From UserDetail Model
  FUNDKARO_ID: 'userDetail.fundkaro_id',
  CITY: 'userDetail.address.city',
  STATE: 'userDetail.address.state',
  PINCODE: 'userDetail.address.pincode',
  CIBIL_SCORE: 'userDetail.cibilScore',
  
  // From PanCard Model
  PAN_FULL_NAME: 'panCard.full_name',
  PAN_NUMBER_VERIFIED: 'panCard.pan_number',
  PAN_CATEGORY: 'panCard.category',
  
  // From AadharCard Model
  AADHAR_FULL_NAME: 'aadharCard.full_name',
  AADHAR_NUMBER_VERIFIED: 'aadharCard.aadhaar_number',
  AADHAR_DOB: 'aadharCard.dob',
  AADHAR_GENDER: 'aadharCard.gender',
  AADHAR_ADDRESS_COUNTRY: 'aadharCard.address.country',
  AADHAR_ADDRESS_STATE: 'aadharCard.address.state',
  AADHAR_ADDRESS_DISTRICT: 'aadharCard.address.dist',
  AADHAR_ADDRESS_POSTAL: 'aadharCard.address.po',
  AADHAR_ADDRESS_LOCALITY: 'aadharCard.address.loc',
  AADHAR_ADDRESS_VTC: 'aadharCard.address.vtc',
  AADHAR_ADDRESS_SUBDISTRICT: 'aadharCard.address.subdist',
  AADHAR_ADDRESS_STREET: 'aadharCard.address.street',
  AADHAR_ADDRESS_HOUSE: 'aadharCard.address.house',
  AADHAR_ADDRESS_LANDMARK: 'aadharCard.address.landmark',
  AADHAR_FACE_SCORE: 'aadharCard.face_score',
  AADHAR_MOBILE_VERIFIED: 'aadharCard.mobile_verified'
};
  
  