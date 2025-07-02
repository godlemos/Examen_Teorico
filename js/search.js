document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('buscador');
    const table = document.getElementById('tablaT');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = table.getElementsByTagName('tr');
        
        // Eliminar resaltado anterior
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            highlight.outerHTML = highlight.innerHTML;
        });
        
        if (searchTerm === '') return;
        
        for (let i = 1; i < rows.length; i++) { // Empezamos desde 1 para saltar el encabezado
            const cells = rows[i].getElementsByTagName('td');
            let found = false;
            
            for (let cell of cells) {
                const text = cell.textContent.toLowerCase();
                const index = text.indexOf(searchTerm);
                
                if (index !== -1) {
                    found = true;
                    const originalText = cell.textContent;
                    cell.innerHTML = originalText.substring(0, index) +
                                    '<span class="highlight">' + 
                                    originalText.substring(index, index + searchTerm.length) +
                                    '</span>' +
                                    originalText.substring(index + searchTerm.length);
                }
            }
            
            // Mostrar/ocultar fila según coincidencia
            rows[i].style.display = found ? '' : 'none';
        }
    });
});
