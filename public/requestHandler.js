const baseUrl = window.location.origin + '/chillies/';
const requestMap = {

    fetch : 'GET',
    add : 'POST',
    update : 'PUT',
    remove : 'DELETE'


}

const statusDisplay = document.querySelector('.status');
const bodyDisplay = document.querySelector('.bodyDisplay');;

Object.values(document.forms).forEach( (form) =>{
  
  form.addEventListener('submit', (event) =>{


    event.preventDefault(); 

    let formData = new FormData(form);

    let fetchOptions = {
      method: requestMap[form.id],
      mode: 'same-origin',
    };
    let url = baseUrl + ( formData.has('chId')? formData.get('chId'):'' );



    if (fetchOptions.method == 'POST' || fetchOptions.method =='PUT'){
      
      // convert formData to JSON with appropriate keys
      let formObject = {};
      formData.forEach((value, key) => formObject[key.toLowerCase().substring(2)] = value); // remove 'ch'

      fetchOptions.body = JSON.stringify(formObject);
      fetchOptions.headers = {'Content-Type': 'application/json'};
      console.log(JSON.stringify(formObject));

    }



    
    
    
    
    fetch(url ,fetchOptions)
    .then(response => { 

      statusDisplay.innerHTML = `${response.status} ${response.statusText} `;

      if (response.ok){
        return response.json();
      }
      else {

         throw new Error('invalid response');

      }
     

    }).then(
      
      res => bodyDisplay.innerHTML= JSON.stringify(res) 
      
      )
    .catch(err => {     
        bodyDisplay.innerHTML= '{}';
      
     });

});
});





// 