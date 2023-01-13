import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import EmployeService from "../../service/EmployeService";
import { PrimeIcons } from 'primereact/api'
import { Menubar } from 'primereact/menubar';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Swal from 'sweetalert2'
import './custom.css'

import '/node_modules/primeflex/primeflex.css'
import { Toolbar } from "primereact/toolbar";
import { width } from "@mui/system";
import AttendanceService from '../../service/AttendanceService'

const Testing = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await AttendanceService.getAllAttendance();
        setAttendance(data);
    };
    fetchData();
}, []);
const theme = useTheme();
const colors = tokens(theme.palette.mode);

const formatTime = (time) => {
  if (!time) return '';   
  let date = new Date(time);
  let options = {hour: 'numeric', minute: 'numeric'};
  return date.toLocaleTimeString('en-US', options);
} 
const formatDate = (time) => {
  let date = new Date(time);
  let options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}



  // CONTENIDO (ARRAYS) 
  const items = [
    {
      label:'exportar excel',
      icon: PrimeIcons.FILE_EXCEL,
      command: ()=> {exportExcel()}
    }
  ]

  // const imageBodyTemplate = (attendance) => {
  //   if(!attendance.photo){
  //   return <span>No photo</span>
  //   }
  //   return <img src={attendance.photo} alt={attendance.first_name}/>;
  //   }

  const imageBodyTemplate = (attendance) => {
    return <img src={`${attendance.photo}`} style={{width: "50px", height: "50px"}} className="product-image" />;
}  

  const columns = [
    {
      field: "pinEmploye",
      headerName: "PIN",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "first_name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Apellido",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Fecha",
      flex: 1,
      renderCell: (params) => (
        <strong>{formatDate(params.value)}</strong>
      ),   
    },
    {
      field: "arrival",
      headerName: "Llegada",
      flex: 1,
      renderCell: (params) => (
        <strong>{formatTime(params.value)}</strong>
      ),
    },
    {
      field: "breakIn",
      headerName: "Salida almuerzo",
      flex: 1,
      renderCell: (params) => (
        <strong>{formatTime(params.value)}</strong>
      ),
    },
    {
      field: "breakOut",
      headerName: "Entrada almuerzo",
      flex: 1,
      renderCell: (params) => (
        <strong>{formatTime(params.value)}</strong>
      ),
    },
    {
      field: "departure",
      headerName: "Salida",
      flex: 1,
      renderCell: (params) => (
        <strong>{formatTime(params.value)}</strong>
      ),
    },
    {
      field: "photo",
      header: "Imagen",
      flex: 2,
      cellClassName: "image-in-table",
      renderCell: (params) => (
          <img src={params.value} />
      ),
  },
    
  ];

  const exportExcel = () => {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(attendance);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAsExcelFile(excelBuffer, 'employes');
    });
}

const saveAsExcelFile = (buffer, fileName) => {
  import('file-saver').then(module => {
      if (module && module.default) {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data = new Blob([buffer], {
              type: EXCEL_TYPE
          });

          module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
  });
}

const exportBtn = () => {
  return (
    <Button type="button" label="Exportar Registros" icon="pi pi-download" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
  )
}

  return (
    
    <Box m="20px">
      <Header title="EMPLEADOS" subtitle="Administración de empleados" />
      
      <Menubar model={items}  style={{
                                       justifyContent: "center",  
                                       background: "none", 
                                       /* border: "none", */
                                       width: "200px" }} />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={attendance} /* checkboxSelection */
          dataKey="id" columns={columns} className="custom-row-height" localeText={{
            noRowsLabel: "No se ha encontrado datos.",
            noResultsOverlayLabel: "No se ha encontrado ningún resultado",
            toolbarColumns: "Columnas",
            toolbarColumnsLabel: "Seleccionar columnas",
            toolbarFilters: "Filtros",
            toolbarExport: "Exportar",
            collapseDetailPanel:"test",
            toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Descargar como CSV',
  toolbarExportPrint: 'Imprimir',
  toolbarExportExcel: 'Descargar como Excel',
        }}components={{ Toolbar: GridToolbar}}/>
      </Box>
    </Box>
  );
};


export default Testing;