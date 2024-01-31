import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { getCurrentIndianDateTime } from '../../Global/getTime';
import { DownloadIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import showToast from '../../Global/Toast';

function ExportToExcelButton({ excelData, department }) {
    const [workbook, setWorkbook] = useState(null);
    const toast = useToast();
  
    const handleExport = () => {
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const { date, time } = getCurrentIndianDateTime();
      if (department == 'data' || !excelData) {
        showToast(toast, 'Error', 'error', "Try Again Later");
        return;
      }
      XLSX.writeFile(workbook, `${department}-${time}-${date}.xlsx`);
    };
    if (excelData.length >= 1) {
      return (
        <div style={{ width: '100%', padding: '5px 2vw', display: 'flex', justifyContent: 'flex-end', marginTop: '15px', marginBottom: '15px' }}>
          <Button onClick={handleExport} rightIcon={<DownloadIcon />} colorScheme='green' variant='outline'>
            Download
          </Button>
        </div>
  
      );
    }
  }
  
  export default ExportToExcelButton;