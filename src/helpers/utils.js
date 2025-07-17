import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import logoBase64 from '@assets/images/logo/logo-dark-blue.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import duration from 'dayjs/plugin/duration';
import { getLocationToAddress } from './backend_helper';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
dayjs.extend(duration);

export const formateDate = (dateStr, format = 'MMMM D, YYYY') => {
  if (!dateStr) return '';
  return dayjs(dateStr).format(format);
};

export const fixAndFormatTime = (timeStr) => {
  // Check for minute part length and pad if necessary
  const parts = timeStr.split(':');
  if (parts[1].length === 1) {
    parts[1] = '0' + parts[1]; // Pad single digit minutes
  }

  // Reconstruct the time string with padding if needed
  const paddedTimeStr = parts.join(':');

  // Convert and format to "HH:MM:SS"
  return dayjs(paddedTimeStr, 'HH:mm').format('HH:mm:ss');
};

export const changeToNameCase = (text) => {
  const words = text.split(' ');
  const wordArray = words.map((word) => {
    word = text.split('');
    word[0] = word[0].toUpperCase();
    return word.join('');
  });
  return wordArray.join(' ');
};

export const downloadExcel = (data, fileName) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert data to worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate a buffer containing the workbook data
  const wbBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  // Create a Blob object from the buffer
  const wbBlob = new Blob([wbBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // Create a URL for the Blob
  const wbBlobUrl = window.URL.createObjectURL(wbBlob);

  // Create a download link and trigger the download
  const link = document.createElement('a');
  link.href = wbBlobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Release the object URL
  window.URL.revokeObjectURL(wbBlobUrl);
};

export const getTimeOfDay = () => {
  const hour = dayjs().hour();

  if (hour >= 5 && hour < 12) {
    return 'Morning';
  } else if (hour >= 12 && hour < 16) {
    return 'Afternoon';
  } else if (hour >= 16 && hour < 21) {
    return 'Evening';
  } else {
    return 'Night';
  }
};

export const flattenObject = (obj, path = '') =>
  _.transform(
    obj,
    (result, value, key) => {
      const fullPath = path ? `${key}` : key;

      if (_.isObject(value) && !_.isArray(value) && value !== null) {
        _.assign(result, flattenObject(value, fullPath));
      } else {
        _.set(result, fullPath, value);
      }
    },
    {}
  );

export const getExpiredDoc = (data, expiryType) => {
  const currentDate = new Date();

  const expiredDocs = data.filter((Value) => {
    const expiryDate = new Date(Value[expiryType]);

    if (expiryType === 'RegistrationDate') {
      const fifteenYearsLater = new Date(expiryDate);
      fifteenYearsLater.setFullYear(fifteenYearsLater.getFullYear() + 15);
      return fifteenYearsLater <= currentDate;
    } else {
      return expiryDate <= currentDate;
    }
  });

  return expiredDocs;
};

export const getExpirySoonDoc = (data, expiryType) => {
  const currentDate = new Date();

  const expirySoonDocs = data.filter((Value) => {
    const expiryDate = new Date(Value[expiryType]);

    if (expiryType === 'RegistrationDate') {
      const fifteenYearsLater = new Date(expiryDate);
      fifteenYearsLater.setFullYear(fifteenYearsLater.getFullYear() + 15);

      const timeDiff = fifteenYearsLater - currentDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);

      return daysDiff <= 30 && daysDiff > 0;
    } else {
      const timeDiff = expiryDate - currentDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);

      return daysDiff <= 30 && daysDiff > 0;
    }
  });

  return expirySoonDocs;
};

export const getValidDoc = (data, expiryType) => {
  const currentDate = new Date();

  const validDocs = data.filter((Value) => {
    const expiryDate = new Date(Value[expiryType]);

    if (expiryType === 'RegistrationDate') {
      const fifteenYearsLater = new Date(expiryDate);
      fifteenYearsLater.setFullYear(fifteenYearsLater.getFullYear() + 15);
      return fifteenYearsLater > currentDate;
    } else {
      return expiryDate > currentDate;
    }
  });

  return validDocs;
};

export const flattenObjectWithPath = (obj, path = '') =>
  _.transform(
    obj,
    (result, value, key) => {
      const fullPath = path ? `${path}_${key}` : key;

      if (_.isObject(value) && !_.isArray(value) && value !== null) {
        _.assign(result, flattenObject(value, fullPath));
      } else {
        _.set(result, fullPath, value);
      }
    },
    {}
  );

export const filterFields = (formStructure, data) => {
  // Create a deep copy of formStructure to avoid modifying the original object
  const filteredStructure = JSON.parse(JSON.stringify(formStructure));

  // Iterate over each section in formStructure
  Object.keys(filteredStructure).forEach((sectionKey) => {
    const section = filteredStructure[sectionKey];

    // Check if fields exist in the section
    if (section.fileds) {
      // Iterate over each row in fields
      Object.keys(section.fileds).forEach((rowKey) => {
        const row = section.fileds[rowKey];

        // Iterate over each field in the row
        Object.keys(row).forEach((fieldKey) => {
          // Check if the field exists in data and is not empty
          if (data[fieldKey] && data[fieldKey] !== '') {
            // Delete the field from the filtered structure
            delete row[fieldKey];
          }
        });

        // If the row becomes empty, remove the row as well
        if (Object.keys(row).length === 0) {
          delete section.fileds[rowKey];
        }
      });

      // If fileds becomes empty after processing all rows, remove it from the section
      if (Object.keys(section.fileds).length === 0) {
        delete section.fileds;
      }
    }

    // If there are no fileds left in the section, remove the entire section
    if (!section.fileds || Object.keys(section.fileds).length === 0) {
      delete filteredStructure[sectionKey];
    }
  });

  return filteredStructure;
};

export const calculateYearAndMonth = (date) => {
  const now = dayjs();
  const registrationDate = dayjs(date);
  const differenceInMonths = now.diff(registrationDate, 'month');
  const years = Math.floor(differenceInMonths / 12);
  const months = differenceInMonths % 12;

  return { years, months };
};

export function calculateDaysBetween(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.diff(start, 'day');
}

export const toAlphaNumUnderscore = (text) => {
  return text
    .replace(/\s+/g, '_')
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, '');
};

export const findObjectById = (array, catLinkId) => {
  let result = null;
  const search = (arr) => {
    for (const item of arr) {
      if (item.catLinkId === catLinkId) {
        result = item;
        return;
      }
      if (item.children && item.children.length > 0) {
        search(item.children);
      }
    }
  };

  search(array);
  return result;
};

export const getExpiredDrivers = (drivers) => {
  const currentDate = new Date();

  const expiredDrivers = drivers.filter((driver) => {
    const expiryDate = new Date(driver.DrivingLicenceExpiryDate);
    return expiryDate <= currentDate;
  });

  return expiredDrivers;
};

export const getExpirySoonDrivers = (drivers) => {
  const currentDate = new Date();

  const expirySoonDrivers = drivers.filter((driver) => {
    const expiryDate = new Date(driver.DrivingLicenceExpiryDate);
    const timeDiff = expiryDate - currentDate;
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 30 && daysDiff > 0;
  });

  return expirySoonDrivers;
};

export const getValidDrivers = (drivers) => {
  const currentDate = new Date();
  const validDrivers = drivers.filter((driver) => {
    const expiryDate = new Date(driver.DrivingLicenceExpiryDate);
    return (
      expiryDate > currentDate &&
      driver.DrivingLicenceIssueDate &&
      driver.DrivingLicenceIssueDate !== 'NaT' &&
      driver.DrivingLicenceExpiryDate &&
      driver.DrivingLicenceExpiryDate !== 'NaT'
    );
  });
  return validDrivers;
};

// export const getTimePassed = (timestamp) => {
//   const now = dayjs();
//   const past = dayjs(timestamp);

//   // Calculate the duration between now and the provided timestamp
//   const diff = dayjs.duration(now.diff(past));

//   // Format the duration into a human-readable format
//   if (diff.days() > 0) {
//     return `${diff.days()} days`;
//   } else if (diff.seconds() <= 0) {
//     return `few seconds ago`;
//   } else if (diff.hours() > 0) {
//     return `${diff.hours()} hours`;
//   } else if (diff.minutes() > 0) {
//     return `${diff.minutes()} minutes`;
//   } else if (diff.seconds() > 0) {
//     return `${diff.seconds()} seconds`;
//   } else {
//     return ''; // For very recent timestamps
//   }
// };

export const getTimePassed = (timestamp) => {
  const now = dayjs();
  const past = dayjs(timestamp);

  const diffInSeconds = now.diff(past, 'seconds');
  const diffInMinutes = now.diff(past, 'minutes');
  const diffInHours = now.diff(past, 'hours');
  const diffInDays = now.diff(past, 'days');

  if (diffInDays > 0) {
    return `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInSeconds > 0) {
    return `${diffInSeconds} seconds ago`;
  } else {
    return `few seconds ago`;
  }
};

export const getStartOfDayAndCurrentTime = () => {
  const now = new Date(); // Current date and time

  // Create a date object for the start of the day (00:00:00) in local time
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );

  // Adjust to UTC for MongoDB ISO format
  const startOfDayUTC = new Date(
    startOfDay.getTime() - startOfDay.getTimezoneOffset() * 60000
  );
  const currentTimeUTC = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  );

  // Format the dates to ISO 8601 string (compatible with MongoDB's ISODate format)
  const startOfDayString = startOfDayUTC.toISOString();
  const currentTimeString = currentTimeUTC.toISOString();

  return {
    startOfDay: startOfDayString,
    currentTime: currentTimeString,
  };
};

export const distanceInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// export const exportToExcel = (
//   exportData,
//   fileName,
//   // columnWidths = [15, 15, 15, 25, 15, 15, 15]
//   columnWidths = []
// ) => {
//   const ws = XLSX.utils.aoa_to_sheet(exportData);
//   const wb = XLSX.utils.book_new();

//   // Set column widths if provided
//   if (columnWidths) {
//     ws['!cols'] = columnWidths.map((width) => ({ wch: width }));
//   }

//   XLSX.utils.book_append_sheet(wb, ws, 'Detailed Report');

//   // Write the Excel file
//   XLSX.writeFile(wb, fileName + '.xlsx');
// };

export const exportToPDF = (
  pdfColumns,
  pdfRows,
  pdfSummaryRows,
  title,
  fileName
) => {
  // Set the document to landscape mode
  const doc = new jsPDF({ orientation: 'landscape' });

  try {
    // Common header
    doc.text(`TelMX: ${title}`, 14, 10);

    let startY = 20;

    // Only add summary section if pdfSummaryRows exists and has content
    if (pdfSummaryRows && pdfSummaryRows.length > 0) {
      doc.setFontSize(12);
      doc.text('Report Summary:', 15, startY);

      doc.autoTable({
        body: pdfSummaryRows.map((row) => {
          if (row.length === 1 && row[0] === '') {
            return [''];
          }
          return [
            {
              content: row[0],
              styles: { fontStyle: 'bold' },
            },
            row[1],
          ];
        }),
        startY: startY + 5,
        theme: 'plain',
        styles: {
          fontSize: 10,
          cellPadding: 0,
        },
        columnStyles: {
          0: { cellWidth: 100 }, // Adjust width for landscape
          1: { cellWidth: 100 },
        },
      });

      // If summary exists, start main table after it
      startY = doc.lastAutoTable.finalY + 2;
    }

    // Main data table with Blue Header
    doc.autoTable({
      head: [pdfColumns],
      body: pdfRows,
      startY: startY,
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [0, 102, 204], // Blue color in RGB (Dark Blue)
        textColor: 255, // White text
        fontStyle: 'bold',
      },
      theme: 'grid',
    });

    doc.save(fileName + '.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export const exportToCSV = (exportData, fileName) => {
  if (!exportData || exportData.length === 0) {
    console.error('No data available for CSV export');
    return;
  }

  const csvContent = exportData
    .map((row) => row.map((cell) => `"${cell}"`).join(',')) // Ensure proper formatting
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const IDLING_THRESHOLD_MINUTES = localStorage.getItem('IdlingMinutes') || 10; // Customize this value as needed

export const getIdlingVehiclesWithLimit = (vehicles) => {
  return vehicles.filter((device) => {
    if (device.vehicle_state === 'Idling') {
      const statusSince = dayjs(device.status_since);
      if (!statusSince.isValid()) return false;

      const now = dayjs();
      const idlingDurationInMinutes = now.diff(statusSince, 'minute');

      return idlingDurationInMinutes > IDLING_THRESHOLD_MINUTES;
    }
    return false;
  });
};

const SPEED_THRESHOLD = localStorage.getItem('OverSpeedLimit') || 60; // Customize this value as needed

export const getOverspeedingVehicles = (vehicles) => {
  return vehicles.filter(
    (device) =>
      device.vehicle_state === 'Driving' && device.speed > SPEED_THRESHOLD
  );
};

export const tooltipIdMap = {
  Driving: 'success',
  Offline: 'dark',
  Idling: 'warning',
  Parking: 'info',
  'Ignition Off': 'info',
};

export const tooltipId = (vehicleState) => tooltipIdMap[vehicleState] || '';

export const handleDownloadExcel = async (
  title,
  fileName,
  headers,
  columns,
  rows
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`${title} Report`);

  // ✅ Add Summary Headers (if any)
  if (Array.isArray(headers) && headers.length > 0) {
    headers.forEach((headerRow) => {
      const row = worksheet.addRow(headerRow);
      row.eachCell((cell) => {
        cell.font = { size: 14 }; // ✅ Apply font styling correctly
      });
    });
    worksheet.addRow([]); // Blank row after summary
  }

  // ✅ Add Column Headers with Black Background & White Text
  const headerRow = worksheet.addRow(columns);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // White text
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '000000' }, // Black background
    };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  // ✅ Add Data Rows
  rows.forEach((rowData) => {
    worksheet.addRow(rowData);
  });

  // ✅ Auto Adjust Column Widths
  worksheet.columns = columns.map((col, i) => ({
    // header: col,
    key: `col${i}`,
    width: Math.max(
      col.length + 5, // Adjust for headers
      ...rows.map((row) => (row[i] ? row[i].toString().length : 10)) // Adjust for content
    ),
  }));

  // ✅ Write File
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], { type: 'application/octet-stream' }),
    `${fileName}.xlsx`
  );
};

export const handleDownloadPDF = (
  fileName,
  headers,
  columns,
  rows,
  mapImageDataUrl
) => {
  const doc = new jsPDF({ orientation: 'landscape' });

  let startY = 20; // Initial Y position

  // ✅ Separate First Header Row if Headers Exist
  let topHeader = headers.length > 0 ? headers[0] : null;
  let remainingHeaders = headers.length > 1 ? headers.slice(1) : [];

  // ✅ Draw First Header Row on Top of the Image
  if (topHeader) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(topHeader.join(' '), 14, startY);
    startY += 10; // Extra spacing after top header
  }

  // ✅ Check if an image exists and place it below the header
  if (mapImageDataUrl) {
    const imgWidth = 260;
    const imgHeight = 160;
    doc.addImage(mapImageDataUrl, 'PNG', 15, startY, imgWidth, imgHeight);
    startY += imgHeight + 10; // Move start position after image
    // ✅ Move to the Next Page for the Remaining Headers and Table
    doc.addPage();
    startY = 20; // Reset Y position for new page
  }

  // ✅ Add Remaining Headers on the Next Page
  if (remainingHeaders.length > 0) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    remainingHeaders.forEach((headerRow) => {
      doc.text(headerRow.join(' '), 14, startY);
      startY += 6;
    });
  }

  startY += 6; // Extra spacing before the table

  // ✅ Add Main Table
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: startY,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [0, 0, 0], textColor: 255, fontStyle: 'bold' },
    theme: 'grid',
  });

  // ✅ Save the PDF
  doc.save(`${fileName}.pdf`);
};

export const handleDownloadCSV = (fileName, headers, columns, rows) => {
  const exportData = [
    ...headers.map((row) => row.join(',')),
    columns.join(','),
    ...rows.map((row) => row.join(',')),
  ];

  const csvContent = exportData.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
