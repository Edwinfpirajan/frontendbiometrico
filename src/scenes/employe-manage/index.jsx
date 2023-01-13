import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, renderActionsCell } from "@mui/x-data-grid";
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
import ScheduleService from "../../service/ScheduleService";

import '/node_modules/primeflex/primeflex.css'
import { Toolbar } from "primereact/toolbar";
import { width } from "@mui/system";

const Team = () => {

  const [employes, setEmployes] = useState([]);
  const [employe, setEmploye] = useState({});
  const [horary, setHorary] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [saveSucces, setSaveSucces] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState(null)

  const mapSchedules = (schedules) => {
    return schedules.map(schedule => {
      return { label: schedule.arrival + ' - ' + schedule.departure, value: schedule.id_sch }
    });
  }
  
  // useEffect(() => {
  //     const scheduleService = new ScheduleService();
  //     scheduleService.getAllSchedule()
  //       .then(res => {
  //         setSchedule(mapSchedules(res));
  //       })
  //   }, []);

  // useEffect(() => {
  //   let employeService = new EmployeService();
  //   employeService.getAll().then(res => setEmployes(res));
  // }, [!saveSucces])


    // useEffect(() => {
    //   let employeService = new EmployeService();
    //   employeService.getAll().then(res => {
    //       const horary = res.map(employe => {
    //           return { label: employe.arrival + ' - ' + employe.departure, value: employe.id_sch }
    //       });
    //       setEmployes(horary);
    //   });
    // }, [!saveSucces])

    useEffect(() => {
      let employeService = new EmployeService();
      employeService.getAll().then(res => {
          const employesMapped = res.map(employe => {
              return { ...employe, horary: `${employe.arrival} - ${employe.departure}` }
          });
          setEmployes(employesMapped);
      });
  }, [!saveSucces])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // CONTENIDO (ARRAYS) 
  const items = [

    {
      label: 'Nuevo',
      icon: PrimeIcons.PLUS,
      command: () => { showSaveModal(true) }
    },
    {
      label: 'Editar',
      icon: PrimeIcons.PENCIL,
      command: () => { edit() }
    },
    {
      label: 'Eliminar',
      icon: PrimeIcons.TRASH,
      command: () => { deleteEmpleado(employe?.id) }
    },
    {
      label: 'exportar excel',
      icon: PrimeIcons.FILE_EXCEL,
      command: () => { exportExcel() }
    }
  ]

  const nCompany = [
    { label: 'Cascoloco', value: 'Cascoloco' },
    { label: 'Distri Fabrica', value: 'DistriFabrica' },
    { label: 'Mottodo Outtlet', value: 'Mottodo Outtlet' },

  ];

  const nPosition = [
    { label: 'Asesor Comercial', value: 'Asesor Comercial' },
    { label: 'Lider Tienda', value: 'Lider Tienda' }

  ];

  // const horary =[
  //   { label: employe.arrival + ' - ' + employe.departure, value: employe.id_sc, value: 14 },
  // ]


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
      field: "company",
      headerName: "Empresa",
      flex: 1,
    },
    {
      field: "position",
      headerName: "Cargo",
      flex: 1,
    },
    {
      field: "arrival",
      headerName: "Horario",
      flex: 1,
    },
    {
      field: "departure",
      headerName: "Horario",
      flex: 1,
    },
    {
      field: "fechacreacion",
      headerName: "Creado",
      flex: 1,
    }
  ];

  // FUNCIONES 

  // CREAR USUARIOS 

  const save = () => {

    if (!employe?.first_name || !employe?.last_name || !employe?.company || !employe?.position || !employe?.schedule_id) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Es necesario llenar todos los campos',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: 'my-container-class'
        }
      })
      return
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro exitoso',
        showConfirmButton: false,
        timer: 1500
      })
      setShowModal(false)
    }

    let employeService = new EmployeService();
    employeService.save(employe).then(res => {
      setEmploye({})
      setShowModal(false);
      setSaveSucces(!saveSucces);
    });



  };

  const renderFooter = () => {
    return (
      <div>
        <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text" />
        <Button label="Confirmar" icon="pi pi-check" onClick={() => save()} autoFocus />
      </div>
    );
  }

  // EDITAR USUARIOS 

  const showSaveModal = () => {
    setShowModal(true);
    setSaveSucces(!saveSucces);
  };

  const edit = () => {
    setShowModal(true);
  }

  const getInfo = (id) => {
    let employeService = new EmployeService();
    employeService.getInfo(id).then(data => setEmploye(data))
  }

  const deleteEmpleado = (id) => {
    let employeService = new EmployeService();
    employeService.delete(id).then(() => employeService.getAll().then(res => setEmployes(res)))
  }

  const exportExcel = () => {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(employes);
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

      <Menubar model={items} style={{
        justifyContent: "center",
        background: "none",
        /* border: "none", */
        width: "600px"
      }} />
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
        <DataGrid rows={employes} /* checkboxSelection */
          selection={selectedEmpleado} onSelectionModelChange={e => getInfo(e)}
          dataKey="id" columns={columns} localeText={{
            noRowsLabel: "No se ha encontrado datos.",
            noResultsOverlayLabel: "No se ha encontrado ningún resultado",
            toolbarColumns: "Columnas",
            toolbarColumnsLabel: "Seleccionar columnas",
            toolbarFilters: "Filtros",
            toolbarExport: "Exportar",
            collapseDetailPanel: "test",
            toolbarExport: 'Exportar',
            toolbarExportLabel: 'Exportar',
            toolbarExportCSV: 'Descargar como CSV',
            toolbarExportPrint: 'Imprimir',
            toolbarExportExcel: 'Descargar como Excel',
          }} components={{ Toolbar: GridToolbar }} />
        <Dialog header="Empleados" visible={showModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setShowModal(false)} selectedEmpleado>
          <form id="empleado-form">
            <div className="formgrid grid">
              <div className="field col">
                <span className="p-float-label">
                  <InputText name="nombre" value={employe.first_name} onChange={({ target }) => setEmploye({ ...employe, ['first_name']: target.value })} style={{ width: '400px' }} />
                  <label htmlFor="fist_name">Nombre</label>
                </span>
              </div>
              <div className="field col">
                <span className="p-float-label" >
                  <InputText name="apellido" value={employe.last_name} onChange={({ target }) => setEmploye({ ...employe, ['last_name']: target.value })} style={{ width: '400px' }} />
                  <label htmlFor="last_name">Apellido</label>
                </span>
              </div>
            </div>
            <div className="formgrid grid">
              <div className="field col">
                <Dropdown name="empresa" value={employe.company} options={nCompany} onChange={({ target }) => setEmploye({ ...employe, ['company']: target.value })} placeholder="Selecciona una empresa" style={{ width: "400px" }} />
              </div>
              <div className="field col">
                <Dropdown name="cargo" value={employe.position} options={nPosition} onChange={({ target }) => setEmploye({ ...employe, ['position']: target.value })} placeholder="Selecciona un cargo" style={{ width: "400px" }} />
              </div>
              <div className="field col">
              <Dropdown options={employes.map(employe => ({ label: employe.horary, value: employe.id_sch }))}
        value={selectedHorario} onChange={e => setSelectedHorario(e.value)} placeholder="Seleccione un horario"/>
              </div>
            </div>
          </form>


        </Dialog>

      </Box>
    </Box>
  );
};

export default Team;