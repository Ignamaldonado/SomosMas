import Swal from 'sweetalert2';

export function alertConfirmation(titulo, mensaje){
    Swal.fire({
        title: titulo,
        icon: "success",        
        text: mensaje
      });
}

export function alertInfo(titulo, mensaje){
    Swal.fire({
        title: titulo,
        icon: "info",        
        text: mensaje
      });
}

export function alertError (titulo, mensaje){
    Swal.fire({
        title: titulo,
        icon: "error",        
        text: mensaje
      });
}

export function alertWaiting (titulo, mensaje){
  Swal.fire({
      title: titulo,
      icon: "info",        
      text: mensaje,
      showCloseButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    });
}

export function closeCurrentAlert (){
  Swal.close()
}

export async function alertWarning (titulo){
  let res = false
  await Swal.fire({
    title: '¿Estás seguro?',
    html: `<strong>${titulo}</strong> se borrará definitivamente`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      res = true
    }
  })
  return res
}
