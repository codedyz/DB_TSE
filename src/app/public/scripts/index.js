$(function () {
    // Estructura de datos del árbol
    const treeData = [
        {
            text: "Consultas",
            children: [
                { text: "consulta1", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta2", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta3", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta4", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta5", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta6", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta7", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta8", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta9", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta10", icon: "jstree-file", type: "file", class: "sqlCons" },
                { text: "consulta11", icon: "jstree-file", type: "file", class: "sqlCons" }

            ]
        },
        {
            text: "Operaciones",
            children: [
                { text: "crearmodelo",      icon: "jstree-file", type: "file", class: "sqlOper" },
                { text: "cargartabtemp",    icon: "jstree-file", type: "file", class: "sqlOper" },
                { text: "eliminarmodelo",   icon: "jstree-file", type: "file", class: "sqlOper" }
            ]
        },
        {
            text: "Docs",
            children: [
                { text: "Enunciado",            icon: "jstree-file", type: "docs", class: "sqlDocs" },
                { text: "Modelo_Conceptual",    icon: "jstree-file", type: "docs", class: "sqlDocs" },
                { text: "Modelo_Fisico",        icon: "jstree-file", type: "docs", class: "sqlDocs" },
                { text: "Modelo_Logico",        icon: "jstree-file", type: "docs", class: "sqlDocs" },
                { text: "Manual_Tecnico",       icon: "jstree-file", type: "docs", class: "sqlDocs" }
            ]
        }
        // Agregar más directorios y archivos aquí
    ];

    // Inicialización de jsTree
    $('#tree').jstree({
        'core': {
            'themes': {
'dots' : true,
  'stripes' : true
},
            'data': treeData
            
        },
        'plugins': ['types','themes'],
        'types': {
            'default': {
                'icon': 'jstree-folder'
            },
            'file': {
                'icon': 'jstree-file'
            }
        }
    });

    // Manejar clics en nodos de archivo
    $('#tree').on('select_node.jstree', function (e, data) {
        const node = data.node.original.class;
        const new_link = data.node
        if (node === 'sqlCons' ) {
            window.open(new_link.text,"_blank") // Redireccionar a la URL del archivo
            
        }else if (node === 'sqlOper' ){
            window.open(new_link.text,"_blank") // Redireccionar a la URL del archivo
            
        }else{
            //console.log(new_link.text);
            window.open('docs/' + new_link.text+'.pdf'); // Redireccionar a la URL del archivo

        }
    });
});