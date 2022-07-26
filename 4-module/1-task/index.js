function makeFriendsList(friends) {
  
  let list = document.createElement('UL'); 
  
  for (let user of friends) {
  
    let li = document.createElement('LI');
    
    list.insertAdjacentHTML('beforeend', `<li>${user.firstName} ${user.lastName}</li>`);
  
  }

  return list;
  
}