import { APIClient } from './api_helper';
import { API2Client } from './api2_helper';

import * as url from './url_helper';
import axios from 'axios';

const api = new APIClient();
const api2 = new API2Client();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postRegister = (data) => api.create(url.POST_REGISTER, data);

// Login Method
export const postLogin = (data) => api.create(url.POST_LOGIN, data);

// check User Name Availabel or not
export const isUserNameAvailable = (userName) =>
  api.get(url.CHECK_USER_NAME_AVAILABLE + userName);

// postForgetPwd
export const postForgetPwd = (data) =>
  api.create(url.POST_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postProfile = (data) =>
  api.update(url.POST_EDIT_PROFILE + '/' + data.idx, data);

// postForgetPwd
export const postJwtForgetPwd = (data) =>
  api.create(url.POST_JWT_PASSWORD_FORGET, data);

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_JWT_LOGIN, data);

// Get User Invte Info
export const getUserInviteInfo = (inviteId) =>
  api.get(url.GET_USER_INVITE_INFO + inviteId);

// Register Portl Admin
export const registerPortalAdmin = (data) =>
  api.create(url.REGISTER_PORTAL_ADMIN, data);

// update login user
export const updateLoginUser = (portal) =>
  api.update(url.UPDATE_PORTAL + '/' + portal._id, portal);

// CRM
// get Contacts
export const getContacts = (branchId) => api.get(url.GET_CONTACTS + branchId);

// add Contact
export const addNewContact = (contact) =>
  api.create(url.ADD_NEW_CONTACT, contact);

// update Contact
export const updateContact = (contact) =>
  api.put(url.UPDATE_CONTACT + '/' + contact._id, contact);

// delete Contact
export const deleteContact = (contact) => {
  api.delete(url.DELETE_CONTACT + '/' + contact);
};
// Delete delete:true in Clients
export const deleteSelectedContacts = (contacts) => {
  return api.create(url.DELETE_SELECTED_CONTACTS, contacts);
};

// get Companies
export const getCompanies = (branchId) => api.get(url.GET_COMPANIES + branchId);

// add Companies
export const addNewCompanies = (companies) =>
  api.create(url.ADD_NEW_COMPANIES, companies);

// update Companies
export const updateCompanies = (company) => {
  return api.update(url.UPDATE_COMPANIES + '/' + company._id, company);
};

// delete Companies
export const deleteCompanies = (company) =>
  api.delete(url.DELETE_COMPANIES + '/' + company);

// Delete delete:true in Clients
export const deleteSelectedCompanies = (companies) => {
  return api.create(url.DELETE_SELECTED_COMPANIES, companies);
};

// get Deals
export const getDeals = () => api.get(url.GET_DEALS);

// get Comment
export const getLeads = (branchId) => api.get(url.GET_LEADS + branchId);

// add Lead
export const addNewLead = (lead) => api.create(url.ADD_NEW_LEAD, lead);

// update Lead
// export const updateLead = (lead) =>
//   api.update(url.UPDATE_LEAD + '/' + lead._id, lead);

// delete Lead
// export const deleteLead = (lead) => api.delete(url.DELETE_LEAD + '/' + lead);

// Delete
export const deleteSelectedLead = (lead) => {
  return api.create(url.DELETE_SELECTED_LEAD, lead);
};
// *********************  Comment ****************************
// get Comment
export const getComment = () => api.get(url.GET_COMMENTS);

// Get Comment by id
export const getCommentById = (id) => api.get(url.GET_COMMENT_BY_ID + id);

// add Comment
export const addNewComment = (comment) =>
  api.create(url.ADD_NEW_COMMENT, comment);

// update Comment
export const updateComment = (comment) =>
  api.update(url.UPDATE_COMMENT + '/' + comment._id, comment);

// delete Comment
export const deleteComment = (comment) =>
  api.delete(url.DELETE_COMMENT + '/' + comment);

// // Dashboard CRM

// // Balance Overview
export const getTodayBalanceData = () => api.get(url.GET_TODAYBALANCE_DATA);
export const getLastWeekBalanceData = () =>
  api.get(url.GET_LASTWEEKBALANCE_DATA);
export const getLastMonthBalanceData = () =>
  api.get(url.GET_LASTMONTHBALANCE_DATA);
export const getCurrentYearBalanceData = () =>
  api.get(url.GET_CURRENTYEARBALANCE_DATA);

// // Dial Type
export const getTodayDealData = () => api.get(url.GET_TODAYDEAL_DATA);
export const getWeeklyDealData = () => api.get(url.GET_WEEKLYDEAL_DATA);
export const getMonthlyDealData = () => api.get(url.GET_MONTHLYDEAL_DATA);
export const getYearlyDealData = () => api.get(url.GET_YEARLYDEAL_DATA);

// // Sales Forecast
export const getOctSalesData = () => api.get(url.GET_OCTSALES_DATA);
export const getNovSalesData = () => api.get(url.GET_NOVSALES_DATA);
export const getDecSalesData = () => api.get(url.GET_DECSALES_DATA);
export const getJanSalesData = () => api.get(url.GET_JANSALES_DATA);

//API Key
export const getAPIKey = () => api.get(url.GET_API_KEY);

// /////////////////////////////
// Settings Starts
// /////////////////////////////

// get ST Data
export const getSTData = () => api.get(url.GET_ST_DATA);

//---------------------------------tags-------------------------------------
// get tags
export const getTags = () => api.get(url.GET_TAGS);

// add tags
export const getFilteredTagsApi = (tags) => {
  return api.create(url.GET_FILTERED_TAGS, tags);
};

// add tags
export const addNewTags = (tags) => api.create(url.ADD_NEW_TAGS, tags);

// update tags
export const updateTags = (tags) =>
  api.update(url.UPDATE_TAGS + '/' + tags._id, tags);

// delete tags
export const deleteTags = (tags) => api.delete(url.DELETE_TAGS + '/' + tags);

//---------------------------services-------------------------------------
// get services
export const getServices = () => api.get(url.GET_SERVICES);

// add services
export const addNewServices = (services) =>
  api.create(url.ADD_NEW_SERVICES, services);

// update services
export const updateServices = (services) =>
  api.update(url.UPDATE_SERVICES + '/' + services.id, services);

// delete services
export const deleteServices = (services) =>
  api.delete(url.DELETE_SERVICES + '/' + services);

//---------------------------Devices Categories--------------------------------
// get Devices Categories
export const getDevicesCategories = () => api.get(url.GET_DEVICES_CATEGORIES);

// add devicesCategories
export const addNewDevicesCategories = (devicesCategories) =>
  api.create(url.ADD_NEW_DEVICES_CATEGORIES, devicesCategories);

// update devicesCategories
export const updateDevicesCategories = (devicesCategories) =>
  api.update(
    url.UPDATE_DEVICES_CATEGORIES + '/' + devicesCategories.id,
    devicesCategories
  );

// delete devicesCategories
export const deleteDevicesCategories = (devicesCategories) =>
  api.delete(url.DELETE_DEVICES_CATEGORIES + '/' + devicesCategories);

//----------------------------Vehicles Categories--------------------------
// get vehiclesCategories
export const getVehiclesCategories = () => api.get(url.GET_VEHICLES_CATEGORIES);

// add vehiclesCategories
export const addNewVehiclesCategories = (vehiclesCategories) =>
  api.create(url.ADD_NEW_VEHICLES_CATEGORIES, vehiclesCategories);

// update vehiclesCategories
export const updateVehiclesCategories = (vehiclesCategories) =>
  api.update(
    url.UPDATE_VEHICLES_CATEGORIES + '/' + vehiclesCategories.id,
    vehiclesCategories
  );

// delete vehiclesCategories
export const deleteVehiclesCategories = (vehiclesCategories) =>
  api.delete(url.DELETE_VEHICLES_CATEGORIES + '/' + vehiclesCategories);

// /////////////////////////////
// Settings Ends
// /////////////////////////////

// /////////////////////////////
// PORTAL Starts
// /////////////////////////////

// get All Portls
export const getPortal = () => api.get(url.GET_PORTALS);
export const getMPortal = (data) => api.create(url.GET_M_PORTALS, data);

// Get portal by id
export const getPortalById = (id) => api.get(url.GET_PORTAL_BY_ID + id);

// add new portal
export const addNewPortal = (portalData) =>
  api.create(url.ADD_NEW_PORTAL, portalData);

// delete Portal
export const deletePortal = (portal) => {
  api.update(url.DELETE_PORTAL + '/' + portal._id, portal);
};
// Delete delete:true in Clients
export const deleteSelectedPortals = (portals) => {
  return api.create(url.DELETE_SELECTED_PORTALS, portals);
};
// update Portal
export const updatePortal = (portal) =>
  api.update(url.UPDATE_PORTAL + '/' + portal._id, portal);

// update Portal Route
export const updateRouteInfo = (route) =>
  api.create(url.UPDATE_PORTAL_ROUTE, route);

// Bulkupload Portal Reset All
export const bulkUploadResetAll = (branchId) => {
  const res = api2.get(url.BULKUPLOAD_RESET_ALL + branchId);
  return res;
};

// update Branch Status
export const updateBranchStatus = (data) => {
  const res = api.create(url.UPDATE_BRANCH_STATUS, data);
  return res;
};
// /////////////////////////////
// PORTAL Ends
// /////////////////////////////

//************************* client *****************************//

// client
export const getClients = (branchId) => {
  return api.get(url.GET_CLIENTS + branchId);
};

// add new client
export const addNewClient = (clientData) =>
  api.create(url.ADD_NEW_CLIENT, clientData);

export const deleteBulkUploadAll = (collections) =>
  api.create(url.DELETE_BULK_UPLOAD, collections);

// Get client by id
export const getClientById = (id) => api.get(url.GET_CLIENT_BY_ID + id);

// delete Client
export const deleteClient = (client) =>
  api.update(url.DELETE_CLIENT + '/' + client._id, client);

// update Client
export const updateClient = (client) =>
  api.update(url.UPDATE_CLIENT + '/' + client._id, client);

// Bulkupload  Clients
export const bulkuploadClients = (clients, branchId) => {
  const res = api2.create(url.BULKUPLOAD_CLIENTS + branchId, clients);
  return res;
};

// Bulkupload Reset Clients
export const bulkuploadResetClients = (branchId) => {
  const res = api2.get(url.BULKUPLOAD_CLIENTS_RESET + branchId);
  return res;
};

// Delete delete:true in Clients
export const deleteSelectedClients = (clients) => {
  return api.create(url.DELETE_SELECTED_CLIENTS, clients);
};

// Inactive Client
export const inactiveClient = (client) =>
  api.update(url.INACTIVE_CLIENT + '/' + client._id, client);

// Blacklist Client
export const blacklistClient = (client) =>
  api.update(url.BLACKLIST_CLIENT + '/' + client._id, client);

//************************* vendor *****************************//

// GetMonog DB Records from collection
export const getVendors = () => api.get(url.GET_VENDORS);

// add new vendor
export const addNewVendor = (vendor) => api.create(url.ADD_NEW_VENDOR, vendor);

// Get vendor by id
export const getVendorById = (id) => api.get(url.GET_VENDOR_BY_ID + id);

// delete Vendor
export const deleteVendor = (vendor) =>
  api.update(url.DELETE_VENDOR + '/' + vendor.id, vendor);

// update Vendor
export const updateVendor = (vendor) =>
  api.update(url.UPDATE_VENDOR + '/' + vendor.id, vendor);

// Bulkupload Vendors
export const bulkuploadVendors = (vendors, branchId) => {
  const res = api2.create(url.BULKUPLOAD_VENDORS + branchId, vendors);

  return res;
};

// Bulkupload Reset Vendors
export const bulkuploadResetVendors = (branchId) => {
  const res = api2.get(url.BULKUPLOAD_VENDORS_RESET + branchId);
  return res;
};

// Delete delete:true in Vendors
export const deleteSelectedVendors = (vendors) => {
  return api.create(url.DELETE_SELECTED_VENDORS, vendors);
};

// Inactive Client
export const inactiveVendor = (vendor) =>
  api.update(url.INACTIVE_VENDOR + '/' + vendor._id, vendor);

// Blacklist Client
export const blacklistVendor = (vendor) =>
  api.update(url.BLACKLIST_VENDOR + '/' + vendor._id, vendor);

//************************* driver *****************************//

// get driver
export const getDrivers = (portalId) => {
  const res = api.get(url.GET_DRIVERS + portalId);

  return res;
};

// Get driver by id
export const getDriverById = (id) => api.get(url.GET_DRIVER_BY_ID + id);

// add new driver
export const addNewDriver = (driverData) => {
  const res = api.create(url.ADD_NEW_DRIVER, driverData);

  return res;
};

// delete Driver
export const deleteDriver = (driver) =>
  api.update(url.DELETE_DRIVER + '/' + driver.id, driver);

// update Driver
export const updateDriver = (driver) =>
  api.update(url.UPDATE_DRIVER + '/' + driver.id, driver);

// Bulkupload drivers
export const bulkuploadDrivers = (drivers, branchId) => {
  const res = api2.create(url.BULKUPLOAD_DRIVERS + branchId, drivers);
  return res;
};

// Bulkupload Reset Drivers
export const bulkuploadResetDrivers = (branchId) => {
  const res = api2.get(url.BULKUPLOAD_DRIVERS_RESET + branchId);
  return res;
};

// Delete delete:true in drivers
export const deleteSelectedDrivers = (drivers) => {
  return api.create(url.DELETE_SELECTED_DRIVERS, drivers);
};

//************************* vehicle *****************************//

// GetMonog DB Records from collection
export const getVehicles = () => api.get(url.GET_VEHICLES);

// Get vehicle by id
export const getVehicleById = (id) => api.get(url.GET_VEHICLE_BY_ID + id);

//  get vehicle gps device
export const getVehicleGroups = () => api.get(url.GET_VEHICLE_GROUP);

// add new vehicle
export const addNewVehicle = (vehicleData) =>
  api.create(url.ADD_NEW_VEHICLE, vehicleData);

// assign group to vehicle
export const assignGroupVehicle = (groupVehicleData) =>
  api.create(url.ASSIGN_GROUP_VEHICLE, groupVehicleData);

// delete Vehicle
export const deleteVehicle = (vehicle) =>
  api.update(url.DELETE_VEHICLE + '/' + vehicle.id, vehicle);

// update Vehicle
export const updateVehicle = (vehicle) =>
  api.update(url.UPDATE_VEHICLE + '/' + vehicle.id, vehicle);

// Bulkupload  Vehicles
export const bulkuploadVehicles = (vehicles, branchId) => {
  const res = api2.create(url.BULKUPLOAD_VEHICLES + branchId, vehicles);
  return res;
};

// Bulkupload Reset Vehicles
export const bulkuploadResetVehicles = (portalId) => {
  const res = api2.get(url.BULKUPLOAD_VEHICLES_RESET + portalId);
  return res;
};

// Delete delete:true in Vehicles
export const deleteSelectedVehicles = (vehicles) => {
  return api.create(url.DELETE_SELECTED_VEHICLES, vehicles);
};
//************************* gpsVendor *****************************//

// GetMonog DB Records from collection
export const getGPSVendors = () => api.get(url.GET_GPS_VENDORS);

// Get gpsVendor by id
export const getGPSVendorById = (id) => api.get(url.GET_GPS_VENDOR_BY_ID + id);

// add new gpsVendor
export const addNewGPSVendor = (gpsVendor) =>
  api.create(url.ADD_NEW_GPS_VENDOR, gpsVendor);

// delete GPSVendor
export const deleteGPSVendor = (gpsVendor) =>
  api.update(url.DELETE_GPS_VENDOR + +gpsVendor.id, gpsVendor);

// update GPSVendor
export const updateGPSVendor = (gpsVendor) =>
  api.update(url.UPDATE_GPS_VENDOR + '/' + gpsVendor.id, gpsVendor);

//************************* GPS *****************************//
// GetMonog DB Records from collection
// export const getGps = (data) => api.get(url.GET_GPS, data);
export const getGps = () => api.get(url.GET_GPS);

// Get GPS by id
export const getGpsById = (id) => api.get(url.GET_GPS_BY_ID + id);

// add new GPS
export const addNewGps = (gpsData) => api.create(url.ADD_NEW_GPS, gpsData);

// assign GPS to vehicle
export const assignGpsVehicle = (gpsVehicleData) =>
  api.create(url.ASSIGN_GPS_VEHICLE, gpsVehicleData);

//  get vehicle gps device
export const getVehicleGpsDevices = () => api.get(url.GET_VEHICLE_GPS_DEVICES);

// delete GPS
export const deleteGps = (gps) =>
  api.update(url.DELETE_GPS + '/' + gps.id, gps);

// update GPS
export const updateGps = (gps) =>
  api.update(url.UPDATE_GPS + '/' + gps.id, gps);

// Bulkupload  Gps
export const bulkuploadGps = (gps, branchId) => {
  const res = api2.create(url.BULKUPLOAD_GPS + branchId, gps);
  return res;
};
// Delete delete:true in Gps
export const deleteSelectedGps = (gps) => {
  return api.create(url.DELETE_SELECTED_GPS, gps);
};

//************************* Invited Users *****************************//
// InvitedUser
export const getInvitedUsers = (branchId) =>
  api.get(url.GET_INVITED_USERS + branchId);

// add new User
export const addNewInvitedUsers = (userData) =>
  api.create(url.ADD_NEW_INVITED_USER, userData);

// Get User by id
export const getInvitedUsersById = (id) =>
  api.get(url.GET_INVITED_USER_BY_ID + id);

// delete User
export const deleteInvitedUsers = (user) =>
  api.update(url.DELETE_INVITED_USER + '/' + user._id, user);

// update User
export const updateInvitedUsers = (user) =>
  api.update(url.UPDATE_INVITED_USER + '/' + user._id, user);

// Bulkupload  User
export const bulkuploadInvitedUsers = (users, branchId) => {
  const res = api2.create(url.BULKUPLOAD_INVITED_USERS + branchId, users);
  return res;
};

// Delete delete:true in users
export const deleteSelectedInvitedUsers = (users) => {
  return api.create(url.DELETE_SELECTED_INVITED_USERS, users);
};

// Send Login Invite Email
export const sendLoginInviteEmail = (data) =>
  api.create(url.SEND_LOGIN_INVITE_EMAIL, data);

//************************* Users *****************************//
// User
export const getUsers = (users) => api.get(url.GET_USERS, users);

// add new User
export const addNewUser = (userData) => api.create(url.ADD_NEW_USER, userData);

// Get User by id
export const getUserById = (id) => api.get(url.GET_USER_BY_ID + id);

// delete User
export const deleteUser = (user) =>
  api.update(url.DELETE_USER + '/' + user._id, user);

// update User
export const updateUser = (user) =>
  api.update(url.UPDATE_USER + '/' + user._id, user);

// Bulkupload  User
export const bulkuploadUsers = (users, branchId) => {
  const res = api2.create(url.BULKUPLOAD_USERS + branchId, users);
  return res;
};

// Get User Profile
export const getUserProfile = () => {
  const res = api.get(url.GET_USER_PROFILE);
  return res;
};

//************************* Tariffs *****************************//

// Tariffs
export const getTariff = (branchId) => api.get(url.GET_TARIFF + branchId);

// add new Tariff
export const addNewTariff = (tariffData) =>
  api.create(url.ADD_NEW_TARIFF, tariffData);

// Get Tariff by id
export const getTariffById = (id) => api.get(url.GET_TARIFF_BY_ID + id);

// delete Tariff
export const deleteTariff = (tariff) =>
  api.update(url.DELETE_TARIFF + '/' + tariff._id, tariff);

// update Tariff
export const updateTariff = (tariff) =>
  api.update(url.UPDATE_TARIFF + '/' + tariff._id, tariff);

// Bulkupload  Tariffs
export const bulkuploadTariffs = (tariffs, branchId) => {
  const res = api2.create(url.BULKUPLOAD_TARIFFS + branchId, tariffs);
  return res;
};

// Delete delete:true in Tariffs
export const deleteSelectedTariffs = (tariffs) => {
  return api.create(url.DELETE_SELECTED_TARIFFS, tariffs);
};

// add new single vender tariff

export const getSingleVendorTariff = (branchId) =>
  api.get(url.GET_SINGLE_VENDOR_TARIFF + branchId);

export const addSingleVendorTariff = (tariffData) =>
  api.create(url.ADD_NEW_SINGLE_VENDOR_TARIFF, tariffData);

export const updateSingleVendorTariff = (tariff) =>
  api.update(url.UPDATE_SINGLE_VENDOR_TARIFF + '/' + tariff._id, tariff);

export const deleteSingleVendorTariff = (tariff) =>
  api.update(url.DELETE_SINGLE_VENDOR_TARIFF + '/' + tariff._id, tariff);

// Dynamic Form Example
// getDynamicFormById
// addNewDynamicForm,
// deleteDynamicForm,
// updateDynamicForm,

export const getDynamicForm = (data) => api.create(url.GET_M_PORTALS, data);
export const getDynamicFormById = (data) => api.create(url.GET_M_PORTALS, data);
export const addNewDynamicForm = (data) => api.create(url.GET_M_PORTALS, data);
export const deleteDynamicForm = (data) => api.create(url.GET_M_PORTALS, data);
export const updateDynamicForm = (data) => api.create(url.GET_M_PORTALS, data);

export const getFileUpload = (data) =>
  api.create(url.GET_M_PORTALS + 'file', data);
export const getFileUploadById = (data) =>
  api.create(url.GET_M_PORTALS + 'file', data);
export const addNewFileUpload = (data) =>
  api.create(url.GET_M_PORTALS + 'file', data);
export const deleteFileUpload = (data) =>
  api.create(url.GET_M_PORTALS + 'file', data);
export const updateFileUpload = (data) =>
  api.create(url.GET_M_PORTALS + 'file', data);

//************************* MIS *****************************//
// MIS
export const getMIS = (data) => api2.create(url.GET_MIS, data);
export const getMISTrips = (id) => api2.get(url.GET_MIS_TRIPS + id);

// add new MIS
export const uploadMIS = (mis) => api2.create(url.UPLOAD_MIS, mis);

// Get MIS by id
export const getMISById = (id) => api2.get(url.GET_MIS_BY_ID + id);

// Get MIS Detail by id
export const getMISDetailsbyId = (id) =>
  api.get(url.GET_MIS_DETAILS_BY_ID + id);

// delete MIS
export const deleteMIS = (tariff) =>
  api.update(url.DELETE_USER + '/' + tariff._id, tariff);

// update MIS
export const updateMIS = (mis) => api2.update(url.UPDATE_MIS, mis);

// Get MIS by id
export const getBillingbyMISId = (id) =>
  api2.get(url.GET_BILLING_BY_MIS_ID + id);

//************************* MIS Observation *****************************//
// MIS Observation
export const getMisObservation = (data) => api.get(url.GET_MIS_OBSERVATION);

// add new MIS Observation
export const addNewMisObservation = (observation) =>
  api.create(url.ADD_NEW_MIS_OBSERVATION, observation);

// Get MIS by id Observation
export const getMisObservationById = (id) =>
  api.get(url.GET_MIS_OBSERVATION_ID + id);

// delete MIS Observation
export const deleteMisObservation = (observation) =>
  api.update(url.DELETE_MIS_OBSERVATION + '/' + observation._id, observation);

// update MIS Observation
export const updateMisObservation = (observation) =>
  api.update(url.UPDATE_MIS_OBSERVATION + '/' + observation._id, observation);

//************************* Roster Trip *****************************//
// Roster Trip
export const getRosterTrip = (id) => api.get(url.GET_ROSTER_TRIP + id);

// add new Roster Trip
export const addNewRosterTrip = (rosterTrip) =>
  api.create(url.ADD_NEW_ROSTER_TRIP, rosterTrip);

// Get MIS by id Roster Trip
export const getRosterTripById = (id) =>
  api.get(url.GET_ROSTER_TRIP_BY_ID + id);

// delete Roster Trip
export const deleteRosterTrip = (rosterTrip) => {
  const res = api.delete(url.DELETE_ROSTER_TRIP + '/' + rosterTrip._id);
  return res;
};
// update Roster Trip
export const updateRosterTrip = (rosterTrip) => {
  const res = api.update(
    url.UPDATE_ROSTER_TRIP + '/' + rosterTrip._id,
    rosterTrip
  );
  return res;
};

//************************* Zone *****************************//
// Zone
export const getZone = (branchId) => api.get(url.GET_ZONE + branchId);

// add new Zone
export const addNewZone = (zone) => api.create(url.ADD_NEW_ZONE, zone);

// Get MIS by id Zone
export const getZoneById = (id) => api.get(url.GET_ZONE_BY_ID + id);

// delete Zone
export const deleteZone = (zone) =>
  api.update(url.DELETE_ZONE + '/' + zone._id, zone);

// update Zone
export const updateZone = (zone) =>
  api.update(url.UPDATE_ZONE + '/' + zone._id, zone);

// Process MIS Roster Trips
export const processRosterTripsApi = (misId) =>
  api2.get(url.PROCESS_ROSTER_TRIPS + misId);

//************************* Roster *****************************//

// Roster
export const getRoster = (id) => api.get(url.GET_ROSTER_TRIP + id);

// add new Roster
export const addNewRoster = (roster) =>
  api.create(url.ADD_NEW_ROSTER_TRIP, roster);

// Upload Roster excel
export const uploadRoster = (roster) => api2.create(url.UPLOAD_ROSTER, roster);

// Get MIS by id Roster
export const getRosterById = (id) => api.get(url.GET_ROSTER_TRIP_BY_ID + id);

// delete Roster
export const deleteRoster = (roster) => {
  const res = api.delete(url.DELETE_ROSTER_TRIP + '/' + roster._id);
  return res;
};

// update Roster
export const updateRoster = (roster) => {
  const res = api.update(url.UPDATE_ROSTER_TRIP + '/' + roster._id, roster);
  return res;
};

// Get Roster Details
export const getRosterDetails = (rosterDetails) =>
  api.create(url.GET_ROSTER_TRIP_DETAILS, rosterDetails);

export const getFieldApiData = (url, branchId, neededBranchId) =>
  neededBranchId ? api.get(url + '/' + branchId) : api.get(url);

// DOWNLOAD BULKUPLOAD TEMPLATE
export const getDriversTemplate = (branchId) =>
  api2.get(url.GET_DRIVERS_TEMPLATE + branchId);
export const getVehiclesTemplate = (branchId) =>
  api2.get(url.GET_VEHICLES_TEMPLATE + branchId);
export const getTariffsTemplate = (branchId) =>
  api2.get(url.GET_TARIFFS_TEMPLATE + branchId);

// Branch

// get All Branches
export const getBranch = (id) => api.get(url.GET_BRANCH + id);

// add new branch
export const addNewBranch = (branchData) =>
  api.create(url.ADD_NEW_BRANCH, branchData);

// Get branch by id
export const getBranchById = (id) => api.get(url.GET_BRANCH_BY_ID + id);

// Get branches by portal id
export const getBranchesByPortalId = (id) =>
  api.get(url.GET_BRANCHES_BY_PORTAL_ID + id);

// Delete branches by portal id
export const deleteBranchesByPortalId = (id) =>
  api.delete(url.GET_BRANCHES_BY_PORTAL_ID + id);

// delete Branch
export const deleteBranch = (branch) => {
  api.update(url.DELETE_BRANCH + '/' + branch._id, branch);
};

// update Branch
export const updateBranch = (branch) =>
  api.update(url.UPDATE_BRANCH + '/' + branch._id, branch);

// Get branches by portal id
export const getBranchByLoginUserPortalId = (id) =>
  api.get(url.GET_BRANCHES_BY_LOGIN_USER_PORTAL_ID + id);

// delete Branch
export const deleteBranchByPortalId = (branch) => {
  api.update(url.DELETE_BRANCH_PORTAL_ID + '/' + branch._id, branch);
};

// update Branch
export const updateBranchByPortalId = (branch) =>
  api.update(url.UPDATE_BRANCH_PORTAL_ID + '/' + branch._id, branch);

// Get Trips with Missing data
export const getTripsWithMissingData = (data) =>
  api2.get(
    url.GET_TRIPS_WITH_MISSING_DATA +
      data.tripFrom +
      '/' +
      data.dataType +
      '/' +
      data.msId
  );

// Get Client Zones
export const getClientZones = (data) =>
  api2.get(url.GET_CLIENT_ZONES + data.branchId + '/' + data.clientId);

// Get Position from Google
export const getpositionFromGoogle = (data) =>
  api2.create(url.GET_GOOGLE_POSITION, { address: data });

// Upload Document
export const uploadDocument = (formStructure) => {
  const res = api2.create(url.UPLOAD_DOCUMENT, formStructure);
  return res;
};

//************************* User *****************************//
// user
export const getUsersInvited = (data) => {
  return api.create(url.GET_USERS_INVITED, data);
};

// add new user
export const addNewUsersInvited = (user) =>
  api.create(url.ADD_NEW_USER_INVITED, user);

// Get MIS by id user
export const getUsersInvitedById = (id) =>
  api.get(url.GET_USER_INVITED_ID + id);

// delete user
export const deleteUsersInvited = (user) =>
  api.update(url.DELETE_USER_INVITED + '/' + user._id, user);

// update user
export const updateUsersInvited = (user) =>
  api.update(url.UPDATE_USER_INVITED + '/' + user._id, user);

//************************* Roster *****************************//

//************************* Claim starts *****************************//
// claim
export const getClaim = (data) => {
  return api.get(url.GET_CLAIM, data);
};

// add new claim
export const addNewClaim = (claim) => api.create(url.ADD_NEW_CLAIM, claim);

// Get MIS by id claim
export const getClaimById = (id) => api.get(url.GET_CLAIM_ID + id);

// delete claim
export const deleteClaim = (claim) =>
  api.update(url.DELETE_CLAIM + '/' + claim._id, claim);

// Delete delete:true in Clients
export const deleteSelectedClaims = (claims) => {
  return api.create(url.DELETE_SELECTED_CLAIMS, claims);
};

// update claim
export const updateClaim = (claim) =>
  api.update(url.UPDATE_CLAIM + '/' + claim._id, claim);

// Bulkupload  Claims
export const bulkuploadClaims = (claim, branchId) => {
  const res = api2.create(url.BULKUPLOAD_CLAIMS + branchId, claim);
  return res;
};

//************************* Claim ends *****************************//

//************************* Approval starts *****************************//
// approval
export const getApproval = (data) => {
  return api.create(url.GET_APPROVAL, data);
};

// add new approval
export const addNewApproval = (approval) =>
  api.create(url.ADD_NEW_APPROVAL, approval);

// Get MIS by id approval
export const getApprovalById = (id) => api.get(url.GET_APPROVAL_ID + id);

// delete approval
export const deleteApproval = (approval) =>
  api.update(url.DELETE_APPROVAL + '/' + approval._id, approval);

// update approval
export const updateApproval = (approval) =>
  api.update(url.UPDATE_APPROVAL + '/' + approval._id, approval);

//************************* Approval ends *****************************//

//************************* Faq starts *****************************//
// faq
export const getFaq = (branchId) => api.get(url.GET_FAQ + branchId);

// add new faq
export const addNewFaq = (faq) => api.create(url.ADD_NEW_FAQ, faq);

// Get MIS by id faq
export const getFaqById = (id) => api.get(url.GET_FAQ_ID + id);

// delete faq
export const deleteFaq = (faq) =>
  api.update(url.DELETE_FAQ + '/' + faq._id, faq);

// update faq
export const updateFaq = (faq) =>
  api.update(url.UPDATE_FAQ + '/' + faq._id, faq);

export const getFilteredFaqApi = (category) => {
  return api.get(url.GET_FILTERED_FAQS + '/' + category);
};

//************************* Faq ends *****************************//

//---------------------------------categories-------------------------------------
// get categories
export const getCategories = (categoryType) =>
  api.get(url.GET_CATEGORIES + categoryType);

// get all categories
export const getAllCategory = () => api.get(url.GET_ALL_CATEGORIES);

// add categories
export const addNewCategories = (categories) =>
  api.create(url.ADD_NEW_CATEGORIES, categories);

// delete categories
export const deleteCategoies = (categories) =>
  api.delete(url.DELETE_CATEGORIES + '/' + categories);

//************************* CategoryLink starts *****************************//

// categoryLink
export const getCategoryLinks = (data) => {
  return api.create(url.GET_CATEGORY_LINK, data);
};

// add new categoryLink
export const addNewCategoryLink = (categoryLink) =>
  api.create(url.ADD_NEW_CATEGORY_LINK, categoryLink);

// Get MIS by id categoryLink
export const getCategoryLinkById = (id) =>
  api.get(url.GET_CATEGORY_LINK_ID + id);

// delete categoryLink
export const deleteCategoryLink = (categoryLink) =>
  api.create(url.DELETE_CATEGORY_LINK, categoryLink);

// update categoryLink
export const updateCategoryLink = (categoryLink) =>
  api.update(url.UPDATE_CATEGORY_LINK + '/' + categoryLink._id, categoryLink);

//************************* Approval ends *****************************//

//************************* Configuration starts *****************************//
// configuration
export const getConfiguration = () => {
  return api.get(url.GET_CONFIGURATION);
};

// add new configuration
export const addNewConfiguration = (configuration) =>
  api.create(url.ADD_NEW_CONFIGURATION, configuration);

// Get MIS by id configuration
export const getConfigurationById = (id) =>
  api.get(url.GET_CONFIGURATION_ID + id);

// delete configuration
export const deleteConfiguration = (id) =>
  api.delete(url.DELETE_CONFIGURATION + id);

// update configuration
export const updateConfiguration = (configuration) =>
  api.update(url.UPDATE_CONFIGURATION + '/' + configuration._id, configuration);

//************************* Approval ends *****************************//

//************************* Role starts *****************************//
// role
export const getRole = (data) => {
  return api.get(url.GET_ROLE);
};

// add new role
export const addNewRole = (role) => api.create(url.ADD_NEW_ROLE, role);

// Get MIS by id role
export const getRoleById = (id) => api.get(url.GET_ROLE_ID + id);

// delete role
export const deleteRole = (id) => api.delete(url.DELETE_ROLE + id);

// update role
export const updateRole = (role) =>
  api.update(url.UPDATE_ROLE + '/' + role._id, role);

//************************* Role ends *****************************//

//******************************************************
//******************************************************
//******************************************************
//******************************************************
//******************************************************
//*****            **      ****   **********************
//*********   *****  **********   **********************
//*********   *****        ****   **********************
//*********   *****   *********   **********************
//*********   *****       *****         ****************
//******************************************************
//******************************************************
//******************************************************
//******************************************************
//******************************************************

// get Mielage
export const getVehicleMileage = async (data) => {
  if (data) {
    const res = await axios.post(
      process.env.REACT_APP_TELMX_API_URL + `/device/vehicle/mileage`,
      data
    );

    return res.data;
  } else {
    return null;
  }
};

export const getLiveVideoFeed = async (data) => {
  try {
    const res = await api2.create('/video', data);
    return res.data;
  } catch (error) {
    console.error('Error fetching live video feed:', error.message);
    throw error;
  }
};
export const getVideoHistoryReplay = async (data) => {
  try {
    const res = await api2.create('/video/replay', data);
    return res.data;
  } catch (error) {
    console.error('Error fetching live video feed:', error.message);
    throw error;
  }
};

export const getDevicesRoute = async (data) => {
  const routes = await axios.post(
    process.env.REACT_APP_TELMX_API_URL + `/devices/route`,
    data
  );

  return routes;
};

const getBasicAuthHeader = () => {
  const token = btoa(
    `${process.env.REACT_APP_TRACCAR_EMAIL}:${process.env.REACT_APP_TRACCAR_PASSWORD}`
  ); // base64 encode email:password
  return `Basic ${token}`;
};

export const getDevices = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_TRACCAR_URL + `/devices`,
      {
        headers: {
          Authorization: getBasicAuthHeader(),
        },
      }
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error; // Re-throw the error to handle it upstream
  }
};

export const fetchDetailedReport = async (data) => {
  if (data) {
    const res = await axios.post(
      process.env.REACT_APP_TELMX_API_URL + `/reports/detailed`,
      data
    );

    return res.data;
  } else {
    return null;
  }
};

export async function fetchLocationWithDelay(locations) {
  for (const { lat, lon } of locations) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
    } catch (error) {
      console.error(
        `Error fetching location for lat: ${lat}, lon: ${lon}`,
        error
      );
    }
    // Wait for 1 second before the next request
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export const getVehicleDriving = async (data) => {
  if (data) {
    const res = await axios.post(
      process.env.REACT_APP_TELMX_API_URL + `/reports/driving`,
      data
    );

    return res.data;
  } else {
    return null;
  }
};
export const getVehicleParkingReport = async (data) => {
  if (data) {
    const res = await axios.post(
      process.env.REACT_APP_TELMX_API_URL + `/reports/parking`,
      data
    );

    return res.data;
  } else {
    return null;
  }
};
export const getVehicleIdling = async (data) => {
  if (data) {
    const res = await axios.post(
      process.env.REACT_APP_TELMX_API_URL + `/reports/idling`,
      data
    );

    return res.data;
  } else {
    return null;
  }
};
export const getVehicleOffline = async (data) => {
  if (data) {
    const res = await axios.post(
      process.env.REACT_APP_TELMX_API_URL + `/reports/offline`,
      data
    );

    return res;
  } else {
    return null;
  }
};

// ********************************** Vehicle and Device list  starts ******************************************** //

export const getDevicesAndPositions = async () => {
  try {
    const response = await api2.get(`/vehicles`);
    return response.vehicles;
  } catch (error) {
    console.error('Error fetching devices and positions:', error);
    throw error; // Throw the error so it can be handled by the caller
  }
};

// ********************************** Vehicle and Device list  ends ******************************************** //

// ********************************** Adressess for Array starts ******************************************** //
export const getLocationToAddress = async (location) => {
  const lat = location?.latitude;
  const lon = location?.longitude;

  // Basic validation for latitude and longitude
  if (!lat || !lon || isNaN(lat) || isNaN(lon || lat === 0 || lon === 0)) {
    return { address: 'Latitude or longitude out of range' };
  }

  const latitude = parseFloat(lat).toFixed(7);
  const longitude = parseFloat(lon).toFixed(7);

  // Check for valid ranges
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return { address: 'Latitude or longitude out of range' };
  }

  try {
    // Define API URLs
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    // const googleMapsUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;

    // First try Nominatim API
    try {
      const nominatimResponse = await axios.get(nominatimUrl, {
        timeout: 5000,
      });
      const address = nominatimResponse.data.display_name;

      if (address) {
        return { address, source: 'Nominatim' };
      } else {
        throw new Error('Nominatim did not return an address');
      }
    } catch (error) {
      console.error('Nominatim API error:', error.message);
    }
  } catch (error) {
    console.error('Database query error:', error.message);
    return { address: 'Error querying database' };
  }
};

// export async function fetchAddress(lat, lon) {
//   try {
//     // First, attempt with Nominatim
//     const response = await axios.get(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
//       {
//         timeout: 3000, // Adjust timeout as needed
//       }
//     );
//     return response.data.display_name;
//   } catch (error) {
//     console.error('Nominatim API error:', error.message);
//   }
// }
// ********************************** Adressess for Array ends ******************************************** //

export const fetchRoutesReport = async (data) => {
  if (data) {
    const res = await api2.create(`/reports/routes`, data);
    return res;
  } else {
    return null;
  }
};

// export const fetchAllVehicleReport = async (data) => {
//   if (data) {
//     const res = await api2.create(`/reports/vehicles`, data);
//     return res;
//   } else {
//     return null;
//   }
// };

export const fetchParkingReport = async (data) => {
  if (data) {
    const res = await api2.create(`/reports/parking`, data);
    return res;
  } else {
    return null;
  }
};

export const fetchDrivingReport = async (data) => {
  if (data) {
    const res = await api2.create(`/reports/driving`, data);
    return res;
  } else {
    return null;
  }
};

export const fetchOfflineReport = async (data) => {
  if (data) {
    const res = await api2.create(`/reports/offline`, data);
    return res;
  } else {
    return null;
  }
};

// export const fetchAllStatusReport = async (data) => {
//   if (data) {
//     const res = await api2.create(`/reports/all/status`, data);
//     return res;
//   } else {
//     return null;
//   }
// };

export const getBSJVideoRecords = async (data) => {
  if (data) {
    const res = await api2.create(`/video/playback`, data);
    return res;
  } else {
    return null;
  }
};

export const getMettaxiotVideoRecords = async (data) => {
  if (data) {
    const res = await api2.create(`/video/records`, data);

    return res;
  } else {
    return null;
  }
};

export const getServers = async () => {
  const res = await api.get(`/device/servers`);
  return res;
};

export const getVehicleAllStatus = async (data) => {
  const res = await api2.create(`/reports/all/status`, data);
  return res;
};

export const fetchSpeedingReport = async (data) => {
  if (data) {
    const res = await api2.create(`/reports/speeding`, data);
    return res;
  } else {
    return null;
  }
};

// Get Alarms
export const getAlerts = async (data) => {
  const res = await api2.create(url.ALERTS, data);
  return res;
};
// Get Summary Alarms
export const getSummaryAlerts = async () => {
  const res = await api2.get(url.GET_SUMMARY_ALERTS);
  return res;
};
export const handleChangePassword = async (data) => {
  const res = await api.create(url.CHANGE_PASSWORD, data);

  return res;
};

// Archive Media
export const fetchArchiveMedia = async (data) => {
  if (data) {
    const res = await api2.create(`/reports/media-archive`, data);
    return res;
  } else {
    return null;
  }
};
// Reports
export const fetchReport = async (body) => {
  if (body) {
    const res = await api2.create(`/reports`, body);
    return res;
  } else {
    return null;
  }
};

// KM Report
export const fetchKMReport = async (body) => {
  if (body) {
    const res = await api2.create(`/reports/km-report`, body);

    return res;
  } else {
    return null;
  }
};

export const downloadReport = async (postData) => {
  if (!postData) return null;

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_TELMX_API_URL}/reports/download-file`,
      postData,
      {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('authUser'))?.token,
        },
      }
    );

    // Extract filename from Content-Disposition header
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'report.xlsx'; // default fallback

    if (contentDisposition) {
      // More robust filename extraction
      const filenameRegex =
        /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/i;
      const matches = filenameRegex.exec(contentDisposition);

      if (matches && matches[1]) {
        filename = matches[1]
          .trim()
          .replace(/^['"]|['"]$/g, '') // Remove surrounding quotes
          .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores

        // Ensure proper extension
        const extension =
          postData.fileType === 'pdf'
            ? '.pdf'
            : postData.fileType === 'csv'
            ? '.csv'
            : '.xlsx';

        if (!filename.endsWith(extension)) {
          filename = filename.split('.')[0] + extension;
        }
      }
    }

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    // Cleanup with slight delay
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);

    return filename;
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

// ********************************** Tickets starts ******************************************** //

// TAT APIs
export const getAllTATs = async () => {
  try {
    const response = await api.get('tickets/tat');
    return response.data;
  } catch (error) {
    console.error('Error fetching TATs:', error);

    if (error.response) {
      // Log the response status and data
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error Message:', error.message);
    }

    throw error;
  }
};

export const createTAT = async (payload) => {
  try {
    const response = await api.create('tickets/tat', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating TAT:', error);
    throw error;
  }
};

export const updateTAT = async (id, payload) => {
  try {
    const response = await api.put(`tickets/tat/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating TAT with ID :`, error);
    throw error;
  }
};

export const deleteTAT = async (id) => {
  try {
    const response = await api.delete(`tickets/delete/tat/${id} , "DELETE"`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting TAT with ID :`, error);
    throw error;
  }
};

// Category Group APIs
export const getAllCategoryGroups = async () => {
  try {
    const response = await api.get('tickets/category-groups');
    return response.data;
  } catch (error) {
    console.error('Error fetching category groups:', error);
    throw error;
  }
};

export const createCategoryGroup = async (payload) => {
  try {
    const response = await api.create('tickets/category-group', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating category group:', error);
    throw error;
  }
};

export const updateCategoryGroup = async (id, payload) => {
  try {
    const response = await api.put(`tickets/category-group/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating category group with ID }:`, error);
    throw error;
  }
};

export const deleteCategoryGroup = async (id) => {
  try {
    const response = await api.delete(`tickets/delete/category-group/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category group with ID:`, error);
    throw error;
  }
};

// Category APIs
export const getAllCategories = async () => {
  try {
    const response = await api.get('tickets/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (payload) => {
  try {
    const response = await api.create('tickets/category', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id, payload) => {
  try {
    const response = await api.put(`tickets/category/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating category with ID :`, error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(
      `tickets/delete/category/${id}`,
      'DELETE'
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with ID:`, error);
    throw error;
  }
};

// Department APIs
export const getAllDepartments = async () => {
  try {
    const response = await api.get('tickets/departments');
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const createDepartment = async (payload) => {
  try {
    const response = await api.post('tickets/departments', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};

export const updateDepartment = async (id, payload) => {
  try {
    const response = await api.put(`tickets/departments/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating department with ID :`, error);
    throw error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await api.delete(`tickets/delete/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting department with ID:`, error);
    throw error;
  }
};

// Ticket APIs
export const getAllTickets = async () => {
  try {
    const response = await api.get('tickets');
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const createTicket = async (payload) => {
  try {
    const response = await api.create('tickets/create', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const updateTicket = async (id, payload) => {
  try {
    const response = await api.put(`tickets/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating ticket with ID :`, error);
    throw error;
  }
};

export const assignTicket = async (ticketId, payload) => {
  try {
    const response = await api.put(`tickets/${ticketId}/assign`, payload);
    return response.data;
  } catch (error) {
    console.error('Error assigning ticket:', error);
    throw error;
  }
};

export const deleteTicket = async (id) => {
  try {
    const response = await api.delete(`delete/tickets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting ticket with ID :`, error);
    throw error;
  }
};

// Ticket Details (Comments) APIs
export const getTicketDetails = async (ticketId) => {
  try {
    const response = await api.get(`tickets/${ticketId}/responses`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket details for ticket ID :`, error);
    throw error;
  }
};

export const addTicketDetail = async (ticketId, payload) => {
  try {
    const response = await api.create(`tickets/${ticketId}/responses`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error adding ticket detail for ticket ID:`, error);
    throw error;
  }
};

export const updateTicketDetail = async (id, payload) => {
  try {
    const response = await api.put(`tickets/responses/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating ticket detail with ID:`, error);
    throw error;
  }
};

export const deleteTicketDetail = async (id) => {
  try {
    const response = await api.delete(`tickets/responses/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting ticket detail with ID :`, error);
    throw error;
  }
};

// Leads API

export const getAllLeads = async () => {
  try {
    const response = await api.get('tickets/leads');
    return response.data;
  } catch (error) {
    console.error('Error fetching all leads:', error);
    throw error;
  }
};

export const getLeadById = async (id) => {
  try {
    const response = await api.get(`tickets/leads/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lead with ID ${id}:`, error);
    throw error;
  }
};

export const createLead = async (payload) => {
  try {
    const response = await api.create('tickets/leads', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

export const updateLead = async (id, payload) => {
  try {
    const response = await api.put(`tickets/leads/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating lead with ID ${id}:`, error);
    throw error;
  }
};

export const deleteLead = async (id) => {
  try {
    const response = await api.delete(`tickets/leads/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting lead with ID ${id}:`, error);
    throw error;
  }
};

// Device Services API

export const getAllDeviceServices = async () => {
  try {
    const response = await api.get('tickets/device-services');
    return response.data;
  } catch (error) {
    console.error('Error fetching all device services:', error);
    throw error;
  }
};

export const getDeviceServiceById = async (id) => {
  try {
    const response = await api.get(`tickets/device-services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching device service with ID ${id}:`, error);
    throw error;
  }
};

export const createDeviceService = async (payload) => {
  try {
    const response = await api.create('tickets/device-services', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating device service:', error);
    throw error;
  }
};

export const updateDeviceService = async (id, payload) => {
  try {
    const response = await api.put(`tickets/device-services/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating device service with ID ${id}:`, error);
    throw error;
  }
};

export const deleteDeviceService = async (id) => {
  try {
    const response = await api.delete(`tickets/device-services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting device service with ID ${id}:`, error);
    throw error;
  }
};

// export const getTickets = () => api.get(url.GET_TICKETS);
// export const getTicketById = (id) => api.get(url.GET_TICKET_BY_ID + id);
// export const getTicketsByAssignedId = (assignedId) => api.get(url.GET_TICKETS_BY_ASSIGNED_ID + assignedId);
// export const addNewTicket = (ticketData) => api.create(url.ADD_NEW_TICKET, ticketData);
// export const deleteTicket = (id) => api.remove(url.DELETE_TICKET + id);
// export const updateTicket = (id, ticketData) => api.update(url.UPDATE_TICKET + id, ticketData);
// export const assignTicket = (assignmentData) => api.create(url.ASSIGN_TICKET, assignmentData);

// // Ticket Responses
// export const getTicketResponses = (ticketId) => api.get(url.GET_TICKET_RESPONSES + ticketId);
// export const addTicketResponse = (responseData) => api.create(url.ADD_TICKET_RESPONSE, responseData);
// export const updateTicketResponse = (id, responseData) => api.update(url.UPDATE_TICKET_RESPONSE + id, responseData);
// export const deleteTicketResponse = (id) => api.remove(url.DELETE_TICKET_RESPONSE + id);

// // TATs
// export const getTATs = () => api.get(url.GET_TATS);
// export const addNewTAT = (tatData) => api.create(url.ADD_NEW_TAT, tatData);
// export const updateTAT = (id, tatData) => api.update(url.UPDATE_TAT + id, tatData);
// export const deleteTAT = (id) => api.remove(url.DELETE_TAT + id);

// // Category Groups
// export const getCategoryGroups = () => api.get(url.GET_CATEGORY_GROUPS);
// export const addNewCategoryGroup = (data) => api.create(url.ADD_NEW_CATEGORY_GROUP, data);
// export const updateCategoryGroup = (id, data) => api.update(url.UPDATE_CATEGORY_GROUP + id, data);
// export const deleteCategoryGroup = (id) => api.remove(url.DELETE_CATEGORY_GROUP + id);

// // Categories
// export const getCategories = () => api.get(url.GET_CATEGORIES);
// export const addNewCategory = (data) => api.create(url.ADD_NEW_CATEGORY, data);
// export const updateCategory = (id, data) => api.update(url.UPDATE_CATEGORY + id, data);
// export const deleteCategory = (id) => api.remove(url.DELETE_CATEGORY + id);

// // Departments
// export const getDepartments = () => api.get(url.GET_DEPARTMENTS);
// export const addNewDepartment = (data) => api.create(url.ADD_NEW_DEPARTMENT, data);
// export const updateDepartment = (id, data) => api.update(url.UPDATE_DEPARTMENT + id, data);
// export const deleteDepartment = (id) => api.remove(url.DELETE_DEPARTMENT + id);
