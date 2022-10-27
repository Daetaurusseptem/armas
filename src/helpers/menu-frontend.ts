export const getMenuFrontEnd =(role='admin')=>{
  const menu:any =
  [
    {
      title:'',
      icon: 'mdi mdi-gauge',
      submenu: [
      ] 
    }
  ];


  
  if(role==='ADMIN_ROLE'){
    menu[0].title='admin'
    menu[0].submenu.unshift(
          {title:'Usuarios', url:'usuarios'},
          {title:'Empresas', url:'empresas'},
          {title:'Departamentos', url:'departamentos'},
          {title:'Areas', url:'areas'},
          {title:'expedientes', url:'expedientes'}
    );
  }
  
  if(role==='USER_ROLE'){
    
    menu[0].title='Herramientas Maestro'
    menu[0].submenu.unshift(
      {title:'Materias', url:'materias-maestro'}
      );
  }
  
  if(role==='alumno'){
    menu[0].title='alumno'
    
    menu[0].submenu.unshift({title: 'extracurricular', url: 'extra'});
    menu[0].submenu.unshift({title: 'perfil', url: 'perfil-alumno'});
  }
  
  return menu
}