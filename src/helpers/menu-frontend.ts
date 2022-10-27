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
      {title:'Alumnos', url:'alumnos'},
      {title:'Maestros', url:'maestros'},
      {title:'Materias', url:'materias'},
      {title:'Eventos', url:'eventos'},
      {title:'Crear Maestro', url:'crear-maestro'},
      {title:'Crear Materia', url:'materias/crear-materia'},
      {title:'Crear Evento', url:'crear-evento'},
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