$(function () {
    // Estructura de datos del árbol
    const treeData = [
        {
            text: "Consultas",
            children: [
                { text: "consulta1", icon: "jstree-file", type: "file" },
                { text: "consulta2", icon: "jstree-file", type: "file" },
                { text: "consulta3", icon: "jstree-file", type: "file" },
                { text: "consulta4", icon: "jstree-file", type: "file" },
                { text: "consulta5", icon: "jstree-file", type: "file" },
                { text: "consulta6", icon: "jstree-file", type: "file" },
                { text: "consulta7", icon: "jstree-file", type: "file" },
                { text: "consulta8", icon: "jstree-file", type: "file" },
                { text: "consulta9", icon: "jstree-file", type: "file" },
                { text: "consulta10", icon: "jstree-file", type: "file" },
                { text: "consulta11", icon: "jstree-file", type: "file" }

            ]
        },
        {
            text: "Operaciones",
            children: [
                { text: "eliminartabtemp", icon: "jstree-file", type: "file" },
                { text: "cargartabtemp", icon: "jstree-file", type: "file" },
                { text: "eliminarmodelo", icon: "jstree-file", type: "file" },
                { text: "crearmodelo", icon: "jstree-file", type: "file" },
                { text: "cargarmodelo", icon: "jstree-file", type: "file" }
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
        const node = data.node;
        if (node.type === 'file') {
            window.location.href = node.text; // Redireccionar a la URL del archivo
        }
    });
});