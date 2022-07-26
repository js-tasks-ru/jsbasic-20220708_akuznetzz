function highlight(table) {
  
  let rows = table.rows;
  
  for (let row of rows) {
    
    if (row.rowIndex > 0) {

      if(!row.cells[3].hasAttribute('data-available')) { row.hidden = true };

      (row.cells[3].getAttribute('data-available') === 'false') ? row.classList.add('unavailable') : row.classList.add('available');

      (row.cells[2].textContent === 'm') ? row.classList.add('male') : row.classList.add('female');
      
      if (row.cells[1].textContent < 18) {row.style.textDecoration = 'line-through'};
    }
  }
}

