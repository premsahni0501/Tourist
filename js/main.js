var utility = {};

// reusable cross browser support
utility.addEvent = function(element, event, fn)
{
  if(window.addEventListener)
  {
    element.addEventListener(event,fn);
  }
  else{
    element.attachEvent('on' + event, fn);
  }
};

utility.hasClass = function(element, class_name) {
  var curClassName = element.className;
  var checkClass = curClassName.search(class_name);

  if(checkClass == -1)
  {
    return false;
  }
  else{
    return true;
  }
};

utility.addClass = function(element , class_name)
{
  if(!this.hasClass(element, class_name))
  {
    element.className += " ";
    element.className += class_name;
  }
};

utility.removeClass = function(element, class_name)
{
  var curClass = element.className;
  if(this.hasClass(element, class_name))
  {
    var newClass = curClass.replace(class_name, "").trim();
    element.className = newClass;
  }
};

utility.toggleClass = function(element, class_name){
  if(this.hasClass(element, class_name))
  {
    this.removeClass(element, class_name);
    animateElement(collPanel, 'slideout', '0.3');
  }
  else{
    this.addClass(element, class_name);
    animateElement(collPanel, 'slidein', '0.3', "easein");
  }
};



// add behaviour to toggle button
var menu = document.querySelector('#toggle-btn');
var collPanel = document.querySelector('#coll-panel');

utility.addEvent(menu, 'click', function()
{
  utility.toggleClass(collPanel , "active");
});

var goDown = document.querySelector('.go-down');
utility.addEvent(goDown, 'click', function(){
  goDown.baseURI += '#main-content';
});

function animateElement(element, animType, animTime, easing)
{
   element.style.animation = animType + " " + animTime+"s" + easing;
}

var allAnchorsInMenu = document.querySelectorAll('.navbar-nav>li>a');
for(var i=0; i< allAnchorsInMenu.length; i++)
{
  utility.addEvent(allAnchorsInMenu[i],'click',function(){
    utility.toggleClass(collPanel,'active');
  });
}
//-----------------------slideshow--------------
var currentSlide = 0;
var imgArr = ['gokarna.jpg','img1.jpg','jog2.jpg','sigandur.jpg','yana.jpg'];


function left()
{
  currentSlide--;
  if(currentSlide<1)
  {
    currentSlide = imgArr.length-1;
  }
  showImage(currentSlide);
}

var autoSlide = setInterval(left,3000);

function showImage(slideNumber)
{
  imgContainer.setAttribute('src', "img/gallery/"+imgArr[slideNumber]);
}

//---------------advertising popup--------------------------
var adPopup = document.querySelector('.popup');

document.querySelector('body').onload = function(){
  adPopup.style.opacity = 1;
};
var closeBtn = document.querySelector("#close-btn");

utility.addEvent(closeBtn,'click',function(){
  adPopup.style.opacity = 0;
  adPopup.style.pointerEvents = "none";
});


var planTripBtn = document.querySelector('#planYourTrip');
var msgBox = document.querySelector('.trip-planning');
utility.addEvent(planTripBtn, 'click', function(){
  msgBox.style.opacity = 1;
  msgBox.style.pointerEvents = 'auto';
});

var sendBtn = document.getElementById('send');
var cancelBtn = document.getElementById('cancel');
var name = document.getElementById('name').value;
var phone = document.getElementById('phone').value;
var email = document.getElementById('email').value;
var msg = document.getElementById('msgBox').innerText;
var errorMsg = document.getElementById('errMsg');
var formID = document.getElementById('planTripMsgSubmit');

function submitForm(e){
  if(name != '' && phone != '' && email != '')
  {
    if(phone.length == 10 && isEmail(email)){
      errorMsg.style.display = 'block';
      errorMsg.innerHTML = "log: "+name+phone+email+msg;
      e.preventDefault();
    }
    else{
      errorMsg.style.display = 'block';
      errorMsg.innerHTML = '*Please enter a valid phone number and email address.'+isEmail(email);
      // return false;
    }
  }
  else{
    errorMsg.style.display = 'block';
    errorMsg.innerHTML = '**Please enter a valid phone number and email address.'+isEmail(email);
    // return false;
  }
  // return false;
}

utility.addEvent(cancelBtn,'click', function(){
  msgBox.style.opacity = 0;
  msgBox.style.pointerEvents = "none";
});

utility.addEvent(sendBtn,'click', function(){
  submitForm();
});

function isEmail(email)
{
  return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
}
