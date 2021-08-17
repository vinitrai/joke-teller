 const jokeBtn = document.getElementById('jokeBtn');

 //  function to toggle button enable/disable
    function toggleBtn(){
        jokeBtn.disabled = !jokeBtn.disabled;
    }


 function jokeTextToSpeech(jokeText){
    // get a speech object
    let speech = new SpeechSynthesisUtterance();
    // assign properties to the speect object
    speech.text = jokeText;
    speech.lang='en-US';
    speech.pitch=1;
    speech.rate =1;
    speech.volume =1;

    // call the voice fun with speech as argument
    window.speechSynthesis.speak(speech);
    //toggle button when speech is over
    speech.addEventListener('end',toggleBtn);
    
 }


 async function getJokes(){
     const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    
     let ourJoke='';
     try{
        const response = await fetch(apiURL);
        const apiJoke = await response.json();
        if(apiJoke.type === 'twopart'){
            ourJoke = `${apiJoke.setup} ... ${apiJoke.delivery}`;
        }else{
            ourJoke = `${apiJoke.joke}`;
        }
        
        jokeTextToSpeech(ourJoke);
        // use toggle function to disable the button
        toggleBtn();
          
         }catch(error){

     }
 }

// event listener
jokeBtn.addEventListener('click',getJokes);


