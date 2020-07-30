$("#frmAcceso").on('submit',function(e)
{
    e.preventDefault();
    logina=$("#usuario").val();
    clavea=$("#password").val();

    $.post("../ajax/usuario.php?op=verificar",
        {"logina":logina,"clavea":clavea},
        function(data)
    {
        if (data!="null")
        {
            $(location).attr("href","escritorio.php");            
        }
        else
        {
            bootbox.alert("Usuario y/o Password incorrectos");
        }
    });
})