export const getMenuFrontEnd =(role='admin')=>{
  const menu:any =
  [
    {
      id:'',
      title:'',
      icon: 'mdi mdi-gauge',
      submenu: [] 
    }
  ];


  
  if(role==='ADMIN_ROLE'){
    menu[0].title='ADMIN TOOLS'
    menu[0].id='admin'
    menu[0].icon='bi bi-cone-striped'
    menu[0].submenu.unshift(
               {title:'Usuarios', url:'admin/usuarios'},
               {title:'Empresas', url:'admin/empresas'},
               {title:'Departamentos', url:'admin/departamentos'},
               {title:'Areas', url:'admin/areas'}
    );
  }
  
  if(role==='USER_ROLE'){
    
    menu[0].title='Herramientas Usuario'
    menu[0].id='users'
    menu[0].icon='bi bi-people-fillS'
    menu[0].submenu.unshift(
              {title:'Empresas', url:'empresas'}
           
      );
  }
  
  if(role==='alumno'){
    menu[0].title='alumno'
    
    menu[0].submenu.unshift({title: 'extracurricular', url: 'extra'});
    menu[0].submenu.unshift({title: 'perfil', url: 'perfil-alumno'});
  }
  
  return menu
}