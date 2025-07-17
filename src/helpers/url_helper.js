//REGISTER
export const POST_REGISTER = '/auth/signup';

//LOGIN
export const POST_LOGIN = '/auth/login';
export const POST_JWT_LOGIN = '/auth';
// export const POST_JWT_LOGIN = '/auth/login';
export const GET_USER_INVITE_INFO = '/auth/invite-info/';
export const REGISTER_PORTAL_ADMIN = '/auth/register-portal-admin';
export const POST_PASSWORD_FORGET = '/auth/forgot-password';
export const POST_JWT_PASSWORD_FORGET = '/jwt-forget-pwd';
export const SOCIAL_LOGIN = '/social-login';
export const CHECK_USER_NAME_AVAILABLE = '/user/check/';
export const SEND_LOGIN_INVITE_EMAIL = '/auth/invite';
export const GET_USER_PROFILE = '/user/get/profile';
export const CHANGE_PASSWORD = '/auth/change-password';

//PROFILE
export const POST_EDIT_JWT_PROFILE = '/post-jwt-profile';
export const POST_EDIT_PROFILE = '/user';

// Calendar
export const GET_EVENTS = '/events';
// export const GET_CATEGORIES = '/categories';
export const GET_UPCOMMINGEVENT = '/upcommingevents';
export const ADD_NEW_EVENT = '/add/event';
export const UPDATE_EVENT = '/update/event';
export const DELETE_EVENT = '/delete/event';

// Chat
export const GET_DIRECT_CONTACT = '/chat';
export const GET_MESSAGES = '/messages';
export const ADD_MESSAGE = 'add/message';
export const GET_CHANNELS = '/channels';
export const DELETE_MESSAGE = 'delete/message';

//Mailbox
export const GET_MAIL_DETAILS = '/mail';
export const DELETE_MAIL = '/delete/mail';

// Ecommerce
// Product
export const GET_PRODUCTS = '/apps/product';
export const DELETE_PRODUCT = '/apps/product';
export const ADD_NEW_PRODUCT = '/apps/product';
export const UPDATE_PRODUCT = '/apps/product';

// Orders
export const GET_ORDERS = '/apps/order';
export const ADD_NEW_ORDER = '/apps/order';
export const UPDATE_ORDER = '/apps/order';
export const DELETE_ORDER = '/apps/order';

// Customers
export const GET_CUSTOMERS = '/apps/customer';
export const ADD_NEW_CUSTOMER = '/apps/customer';
export const UPDATE_CUSTOMER = '/apps/customer';
export const DELETE_CUSTOMER = '/apps/customer';

// Sellers
export const GET_SELLERS = '/sellers';

// Project list
export const GET_PROJECT_LIST = '/project/list';

// Task
export const GET_TASK_LIST = '/apps/task';
export const ADD_NEW_TASK = '/apps/task';
export const UPDATE_TASK = '/apps/task';
export const DELETE_TASK = '/apps/task';

// CRM
// Conatct
export const GET_CONTACTS = '/contact/';
export const ADD_NEW_CONTACT = '/contact';
export const UPDATE_CONTACT = '/contact';
export const DELETE_CONTACT = '/contact';
export const DELETE_SELECTED_CONTACTS = '/contact/delete';

// Companies
export const GET_COMPANIES = '/company/';
export const ADD_NEW_COMPANIES = '/company';
export const UPDATE_COMPANIES = '/company';
export const DELETE_COMPANIES = '/company';
export const DELETE_SELECTED_COMPANIES = '/company/delete';

// Lead
export const GET_LEADS = '/lead/';
export const ADD_NEW_LEAD = '/lead';
export const UPDATE_LEAD = '/lead';
export const DELETE_LEAD = '/lead';
export const DELETE_SELECTED_LEAD = '/lead/delete';

// Comment
export const GET_COMMENTS = '/comment';
export const ADD_NEW_COMMENT = '/comment';
export const GET_COMMENT_BY_ID = '/comment/filtered/';
export const UPDATE_COMMENT = '/comment';
export const DELETE_COMMENT = '/comment';

// Deals
export const GET_DEALS = '/deals';

// Crypto
export const GET_TRANSACTION_LIST = '/transaction-list';
export const GET_ORDRER_LIST = '/order-list';

// Invoice
export const GET_INVOICES = '/apps/invoice';
export const ADD_NEW_INVOICE = '/apps/invoice';
export const UPDATE_INVOICE = '/apps/invoice';
export const DELETE_INVOICE = '/apps/invoice';

// TicketsList
export const GET_TICKETS_LIST = '/apps/ticket';
export const ADD_NEW_TICKET = '/apps/ticket';
export const UPDATE_TICKET = '/apps/ticket';
export const DELETE_TICKET = '/apps/ticket';

// Dashboard Analytics

// Sessions by Countries
export const GET_ALL_DATA = '/all-data';
export const GET_HALFYEARLY_DATA = '/halfyearly-data';
export const GET_MONTHLY_DATA = '/monthly-data';

// Audiences Metrics
export const GET_ALLAUDIENCESMETRICS_DATA = '/allAudiencesMetrics-data';
export const GET_MONTHLYAUDIENCESMETRICS_DATA = '/monthlyAudiencesMetrics-data';
export const GET_HALFYEARLYAUDIENCESMETRICS_DATA =
  '/halfyearlyAudiencesMetrics-data';
export const GET_YEARLYAUDIENCESMETRICS_DATA = '/yearlyAudiencesMetrics-data';

// Users by Device
export const GET_TODAYDEVICE_DATA = '/todayDevice-data';
export const GET_LASTWEEKDEVICE_DATA = '/lastWeekDevice-data';
export const GET_LASTMONTHDEVICE_DATA = '/lastMonthDevice-data';
export const GET_CURRENTYEARDEVICE_DATA = '/currentYearDevice-data';

// Audiences Sessions by Country
export const GET_TODAYSESSION_DATA = '/todaySession-data';
export const GET_LASTWEEKSESSION_DATA = '/lastWeekSession-data';
export const GET_LASTMONTHSESSION_DATA = '/lastMonthSession-data';
export const GET_CURRENTYEARSESSION_DATA = '/currentYearSession-data';

// Dashboard CRM

// Balance Overview
export const GET_TODAYBALANCE_DATA = '/todayBalance-data';
export const GET_LASTWEEKBALANCE_DATA = '/lastWeekBalance-data';
export const GET_LASTMONTHBALANCE_DATA = '/lastMonthBalance-data';
export const GET_CURRENTYEARBALANCE_DATA = '/currentYearBalance-data';

// Deal type
export const GET_TODAYDEAL_DATA = '/todayDeal-data';
export const GET_WEEKLYDEAL_DATA = '/weeklyDeal-data';
export const GET_MONTHLYDEAL_DATA = '/monthlyDeal-data';
export const GET_YEARLYDEAL_DATA = '/yearlyDeal-data';

// Sales Forecast

export const GET_OCTSALES_DATA = '/octSales-data';
export const GET_NOVSALES_DATA = '/novSales-data';
export const GET_DECSALES_DATA = '/decSales-data';
export const GET_JANSALES_DATA = '/janSales-data';

// Dashboard Ecommerce
// Revenue
export const GET_ALLREVENUE_DATA = '/allRevenue-data';
export const GET_MONTHREVENUE_DATA = '/monthRevenue-data';
export const GET_HALFYEARREVENUE_DATA = '/halfYearRevenue-data';
export const GET_YEARREVENUE_DATA = '/yearRevenue-data';

// Dashboard Crypto
// Portfolio
export const GET_BTCPORTFOLIO_DATA = '/btcPortfolio-data';
export const GET_USDPORTFOLIO_DATA = '/usdPortfolio-data';
export const GET_EUROPORTFOLIO_DATA = '/euroPortfolio-data';

// Market Graph
export const GET_ALLMARKETDATA_DATA = '/allMarket-data';
export const GET_YEARMARKET_DATA = '/yearMarket-data';
export const GET_MONTHMARKET_DATA = '/monthMarket-data';
export const GET_WEEKMARKET_DATA = '/weekMarket-data';
export const GET_HOURMARKET_DATA = '/hourMarket-data';

// Dashboard Crypto
// Project Overview
export const GET_ALLPROJECT_DATA = '/allProject-data';
export const GET_MONTHPROJECT_DATA = '/monthProject-data';
export const GET_HALFYEARPROJECT_DATA = '/halfYearProject-data';
export const GET_YEARPROJECT_DATA = '/yearProject-data';

// Project Status
export const GET_ALLPROJECTSTATUS_DATA = '/allProjectStatus-data';
export const GET_WEEKPROJECTSTATUS_DATA = '/weekProjectStatus-data';
export const GET_MONTHPROJECTSTATUS_DATA = '/monthProjectStatus-data';
export const GET_QUARTERPROJECTSTATUS_DATA = '/quarterProjectStatus-data';

// Dashboard NFT
// Marketplace
export const GET_ALLMARKETPLACE_DATA = '/allMarketplace-data';
export const GET_MONTHMARKETPLACE_DATA = '/monthMarketplace-data';
export const GET_HALFYEARMARKETPLACE_DATA = '/halfYearMarketplace-data';
export const GET_YEARMARKETPLACE_DATA = '/yearMarketplace-data';

// Project
export const ADD_NEW_PROJECT = '/add/project';
export const UPDATE_PROJECT = '/update/project';
export const DELETE_PROJECT = '/delete/project';

// Pages > Team
export const GET_TEAMDATA = '/teamData';
export const DELETE_TEAMDATA = '/delete/teamData';
export const ADD_NEW_TEAMDATA = '/add/teamData';
export const UPDATE_TEAMDATA = '/update/teamData';

// File Manager
// Folder
export const GET_FOLDERS = '/folder';
export const DELETE_FOLDER = '/delete/folder';
export const ADD_NEW_FOLDER = '/add/folder';
export const UPDATE_FOLDER = '/update/folder';

// File
export const GET_FILES = '/file';
export const DELETE_FILE = '/delete/file';
export const ADD_NEW_FILE = '/add/file';
export const UPDATE_FILE = '/update/file';

// To do
export const GET_TODOS = '/todo';
export const DELETE_TODO = '/delete/todo';
export const ADD_NEW_TODO = '/add/todo';
export const UPDATE_TODO = '/update/todo';

// To do Project
export const GET_PROJECTS = '/projects';
export const ADD_NEW_TODO_PROJECT = '/add/project';

//JOB APPLICATION
export const GET_APPLICATION_LIST = '/application-list';

//JOB APPLICATION
export const GET_API_KEY = '/api-key';

// Settings URLS

// ST Data
export const GET_ST_DATA = '/settings/data';

// Tags
export const GET_TAGS = '/tag';
export const GET_FILTERED_TAGS = '/tag/filtered';
export const ADD_NEW_TAGS = '/tag';
export const UPDATE_TAGS = '/tag';
export const DELETE_TAGS = '/tag';

// Services
export const GET_SERVICES = '/settings/services';
export const ADD_NEW_SERVICES = '/settings/services';
export const UPDATE_SERVICES = '/settings/services';
export const DELETE_SERVICES = '/settings/services';

// DEVICES_CATEGORIES
export const GET_DEVICES_CATEGORIES = '/settings/devices-cat';
export const ADD_NEW_DEVICES_CATEGORIES = '/settings/devices-cat';
export const UPDATE_DEVICES_CATEGORIES = '/settings/devices-cat';
export const DELETE_DEVICES_CATEGORIES = '/settings/devices-cat';

// VEHICLES_CATEGORIES
export const GET_VEHICLES_CATEGORIES = '/settings/vehicles-cat';
export const ADD_NEW_VEHICLES_CATEGORIES = '/settings/vehicles-cat';
export const UPDATE_VEHICLES_CATEGORIES = '/settings/vehicles-cat';
export const DELETE_VEHICLES_CATEGORIES = '/settings/vehicles-cat';

// PORTAL
export const GET_PORTALS = '/portal';
export const GET_PORTAL_BY_ID = '/portal/';
export const ADD_NEW_PORTAL = '/portal';
export const DELETE_PORTAL = '/portal';
export const UPDATE_PORTAL = '/portal';
export const UPDATE_PORTAL_ROUTE = '/auth/update-route';
export const UPDATE_BRANCH_STATUS = '/auth/update-branch-status';
export const BULKUPLOAD_RESET_ALL = '/bulkupload/reset/';
export const DELETE_SELECTED_PORTALS = '/Portal/delete';
// CLIENT
export const GET_CLIENTS = '/client/';
export const GET_CLIENT_BY_ID = '/client';
export const ADD_NEW_CLIENT = '/client';
export const DELETE_CLIENT = '/client';
export const UPDATE_CLIENT = '/client';
export const BULKUPLOAD_CLIENTS = '/bulkupload/clients/';
export const BULKUPLOAD_CLIENTS_RESET = '/bulkupload/clients/reset/';
export const DELETE_SELECTED_CLIENTS = '/client/delete';
export const INACTIVE_CLIENT = '/client/inactive';
export const BLACKLIST_CLIENT = '/client/blacklist';

// vendor
export const GET_VENDORS = '/vendor';
export const GET_VENDOR_BY_ID = '/vendor';
export const ADD_NEW_VENDOR = '/vendor/add';
export const DELETE_VENDOR = '/vendor/delete';
export const UPDATE_VENDOR = '/vendor/update';
export const BULKUPLOAD_VENDORS = '/bulkupload/vendors/';
export const BULKUPLOAD_VENDORS_RESET = '/bulkupload/vendors/reset/';
export const DELETE_SELECTED_VENDORS = '/vendor/delete';
export const INACTIVE_VENDOR = '/vendor/inactive';
export const BLACKLIST_VENDOR = '/vendor/blacklist';

// driver
export const GET_DRIVERS = '/driver/portalId/';
export const GET_DRIVER_BY_ID = '/driver';
export const ADD_NEW_DRIVER = '/driver/add';
export const DELETE_DRIVER = '/driver/delete';
export const UPDATE_DRIVER = '/driver/update';
export const BULKUPLOAD_DRIVERS = '/bulkupload/drivers/';
export const BULKUPLOAD_DRIVERS_RESET = '/bulkupload/drivers/reset/';
export const DELETE_SELECTED_DRIVERS = '/driver/delete';

// vehicle
export const GET_VEHICLES = '/vehicle';
export const GET_VEHICLE_BY_ID = '/vehicle';
export const ADD_NEW_VEHICLE = '/vehicle/add';
export const GET_VEHICLE_GROUP = '/vehicle/group';
export const ASSIGN_GROUP_VEHICLE = '/vehicle/assign/group';
export const DELETE_VEHICLE = '/vehicle/delete';
export const UPDATE_VEHICLE = '/vehicle/update';
export const BULKUPLOAD_VEHICLES = '/bulkupload/vehicles/';
export const BULKUPLOAD_VEHICLES_RESET = '/bulkupload/vehicles/reset/';
export const DELETE_SELECTED_VEHICLES = '/vehicle/delete';

// TARIF
export const GET_TARIFF = '/tariff/';
export const GET_TARIFF_BY_ID = '/tariff';
export const ADD_NEW_TARIFF = '/tariff';
export const DELETE_TARIFF = '/tariff';
export const UPDATE_TARIFF = '/tariff';
export const BULKUPLOAD_TARIFFS = '/bulkupload/tariffs/';
export const DELETE_SELECTED_TARIFFS = '/tariff/delete';

// Single Vendor TARIF
export const GET_SINGLE_VENDOR_TARIFF = '/singleVendorTariff/';
export const ADD_NEW_SINGLE_VENDOR_TARIFF = '/singleVendorTariff';
export const UPDATE_SINGLE_VENDOR_TARIFF = '/singleVendorTariff';
export const DELETE_SINGLE_VENDOR_TARIFF = '/singleVendorTariff';

// User
export const GET_INVITED_USERS = '/invitedUsers/';
export const GET_INVITED_USER_BY_ID = '/invitedUsers';
export const ADD_NEW_INVITED_USER = '/invitedUsers';
export const UPDATE_INVITED_USER = '/invitedUsers';
export const DELETE_INVITED_USER = '/invitedUsers';
export const SELECTED_INVITED_USER = '/invitedUsers';
export const BULKUPLOAD_INVITED_USERS = '/bulkupload/invitedUsers/';
export const DELETE_SELECTED_INVITED_USERS = '/invitedUsers/delete';

// User
export const GET_USERS = '/user';
export const GET_USER_BY_ID = '/user';
export const ADD_NEW_USER = '/user';
export const UPDATE_USER = '/user';
export const DELETE_USER = '/user';
export const SELECTED_USER = '/user';
export const BULKUPLOAD_USERS = '/bulkupload/users/';

// gpsVendor
export const GET_GPS_VENDORS = '/gpsVendor';
export const GET_GPS_VENDOR_BY_ID = '/gpsVendor';
export const ADD_NEW_GPS_VENDOR = '/gpsVendor';
export const DELETE_GPS_VENDOR = '/gpsVendor';
export const UPDATE_GPS_VENDOR = '/gpsVendor';

// gps
export const GET_GPS = '/device';
export const GET_GPS_BY_ID = '/gps';
export const ADD_NEW_GPS = '/device/add';
export const ASSIGN_GPS_VEHICLE = '/device/assign/vehicle';
export const GET_VEHICLE_GPS_DEVICES = '/device/vehicle';
export const DELETE_GPS = '/device/delete';
export const UPDATE_GPS = '/device/update';
export const BULKUPLOAD_GPS = '/bulkupload/gps/';
export const DELETE_SELECTED_GPS = '/device/delete';

export const GET_M_PORTALS = '/';

//Delete upload
export const DELETE_BULK_UPLOAD = '/replace-all';

// MIS
export const GET_MIS = '/mis'; // V2
export const GET_MIS_TRIPS = '/mis/trips/'; // V2
export const UPDATE_MIS = '/mis/update/status';
export const UPLOAD_MIS = '/mis/upload'; //V2

export const GET_MIS_BY_ID = '/mis/'; //V2
export const GET_MIS_DETAILS_BY_ID = '/portalMisStatus/';
export const PROCESS_ROSTER_TRIPS = '/mis/process/roster/'; //V2
export const GET_BILLING_BY_MIS_ID = '/billing/'; //V2

// MIS Observation
export const GET_MIS_OBSERVATION = '/observation';
export const ADD_NEW_MIS_OBSERVATION = '/observation';
export const GET_MIS_OBSERVATION_ID = '/observation';
export const DELETE_MIS_OBSERVATION = '/observation';
export const UPDATE_MIS_OBSERVATION = '/observation';

// Roster Trip
export const GET_ROSTER_TRIP = '/rosterTrip/';
export const ADD_NEW_ROSTER_TRIP = '/rosterTrip';
export const GET_ROSTER_TRIP_DETAILS = '/rosterTrip/details';
export const GET_ROSTER_DETAILS = '/roster/details';
export const GET_ROSTER_TRIP_BY_ID = '/rosterTrip/branchId/';
export const DELETE_ROSTER_TRIP = '/rosterTrip';
export const UPDATE_ROSTER_TRIP = '/rosterTrip';

// Zone
export const GET_ZONE = '/zone/';
export const ADD_NEW_ZONE = '/zone';
export const GET_ZONE_BY_ID = '/zone/';
export const DELETE_ZONE = '/zone';
export const UPDATE_ZONE = '/zone';

// Roster
export const GET_ROSTER = '/roster';
export const ADD_NEW_ROSTER = '/roster';
export const UPLOAD_ROSTER = '/mis/roster/upload';
export const GET_ROSTER_BY_ID = '/roster/branchId/';
export const DELETE_ROSTER = '/roster';
export const UPDATE_ROSTER = '/roster';

// DOWNLOAD BULKUPLOAD TEMPLATE
export const GET_DRIVERS_TEMPLATE = '/bulkupload/template/drivers/';
export const GET_VEHICLES_TEMPLATE = '/bulkupload/template/vehicles/';
export const GET_TARIFFS_TEMPLATE = '/bulkupload/template/tariffs/';

// Branch

export const GET_BRANCH = '/branch';
export const ADD_NEW_BRANCH = '/branch';
export const GET_BRANCH_BY_ID = '/branch/';
export const GET_BRANCHES_BY_PORTAL_ID = '/branch/portalId/';
export const DELETE_BRANCH = '/branch';
export const UPDATE_BRANCH = '/branch';
export const GET_BRANCHES_BY_LOGIN_USER_PORTAL_ID = '/branch/portalId/';
export const DELETE_BRANCH_PORTAL_ID = '/branch';
export const UPDATE_BRANCH_PORTAL_ID = '/branch';

export const GET_TRIPS_WITH_MISSING_DATA = '/mis/missing/'; //V2
export const GET_CLIENT_ZONES = '/mis/client/zones/'; //V2 Getting client zones from tariff by filtergin clientId and brancId

export const GET_GOOGLE_POSITION = '/google/location';

export const UPLOAD_DOCUMENT = '/document/upload';

// Users Invited
export const GET_USERS_INVITED = '/usersinvited/all';
export const ADD_NEW_USER_INVITED = '/usersinvited';
export const GET_USER_INVITED_ID = '/usersinvited';
export const DELETE_USER_INVITED = '/usersinvited';
export const UPDATE_USER_INVITED = '/usersinvited';

// Users Invited
export const GET_CLAIM = '/claim';
export const ADD_NEW_CLAIM = '/claim';
export const GET_CLAIM_ID = '/claim';
export const DELETE_CLAIM = '/claim';
export const UPDATE_CLAIM = '/claim';
export const DELETE_SELECTED_CLAIMS = '/claim/delete';
export const BULKUPLOAD_CLAIMS = '/bulkupload/claims/';

// Users Invited
export const GET_APPROVAL = '/approval/all';
export const ADD_NEW_APPROVAL = '/approval';
export const GET_APPROVAL_ID = '/approval/:id';
export const DELETE_APPROVAL = '/approval';
export const UPDATE_APPROVAL = '/approval';

// faq
export const GET_FAQ = '/faq/';
export const ADD_NEW_FAQ = '/faq';
export const GET_FAQ_ID = '/faq/:id';
export const DELETE_FAQ = '/faq';
export const UPDATE_FAQ = '/faq';
export const GET_FILTERED_FAQS = '/faq/filtered';

// Configuration Categories
export const GET_CATEGORIES = '/category/type/';
export const GET_ALL_CATEGORIES = '/category';
export const ADD_NEW_CATEGORIES = '/category';
export const DELETE_CATEGORIES = '/category';

// Category Link
export const GET_CATEGORY_LINK = '/categoryLink';
export const ADD_NEW_CATEGORY_LINK = '/categoryLink';
export const GET_CATEGORY_LINK_ID = '/categoryLink/:id';
export const DELETE_CATEGORY_LINK = '/categoryLink/delete-by-category';
export const UPDATE_CATEGORY_LINK = '/categoryLink';

// Configuration
export const GET_CONFIGURATION = '/configuration';
export const ADD_NEW_CONFIGURATION = '/configuration';
export const GET_CONFIGURATION_ID = '/configuration/:id';
export const DELETE_CONFIGURATION = '/configuration/:id';
export const UPDATE_CONFIGURATION = '/configuration';

// Role
export const GET_ROLE = '/role';
export const ADD_NEW_ROLE = '/role';
export const GET_ROLE_ID = '/role/:id';
export const DELETE_ROLE = '/role/';
export const UPDATE_ROLE = '/role';

// Alerts
export const ALERTS = '/alarms';

// Alerts
export const GET_SUMMARY_ALERTS = '/alarms/summery';

// // Ticket Endpoints
// export const GET_TICKETS = '/ticket';
// export const GET_TICKET_BY_ID = '/ticket/';
// export const GET_TICKETS_BY_ASSIGNED_ID = '/ticket/assigned/';
// export const ADD_NEW_TICKET = '/ticket/add';
// export const DELETE_TICKET = '/ticket/delete/';
// export const UPDATE_TICKET = '/ticket/update/';
// export const ASSIGN_TICKET = '/ticket/assign';

// // Ticket Responses
// export const GET_TICKET_RESPONSES = '/ticket/responses/';
// export const ADD_TICKET_RESPONSE = '/ticket/response/add';
// export const UPDATE_TICKET_RESPONSE = '/ticket/response/update/';
// export const DELETE_TICKET_RESPONSE = '/ticket/response/delete/';

// // TATs
// export const GET_TATS = '/ticket/tats';
// export const ADD_NEW_TAT = '/ticket/tat/add';
// export const UPDATE_TAT = '/ticket/tat/update/';
// export const DELETE_TAT = '/ticket/tat/delete/';

// // Category Groups
// export const GET_CATEGORY_GROUPS = '/ticket/category-groups';
// export const ADD_NEW_CATEGORY_GROUP = '/ticket/category-group/add';
// export const UPDATE_CATEGORY_GROUP = '/ticket/category-group/update/';
// export const DELETE_CATEGORY_GROUP = '/ticket/category-group/delete/';

// // Categories
// export const GET_CATEGORIES = '/ticket/categories';
// export const ADD_NEW_CATEGORY = '/ticket/category/add';
// export const UPDATE_CATEGORY = '/ticket/category/update/';
// export const DELETE_CATEGORY = '/ticket/category/delete/';

// // Departments
// export const GET_DEPARTMENTS = '/ticket/departments';
// export const ADD_NEW_DEPARTMENT = '/ticket/department/add';
// export const UPDATE_DEPARTMENT = '/ticket/department/update/';
// export const DELETE_DEPARTMENT = '/ticket/department/delete/';
