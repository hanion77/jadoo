let pagers = document.querySelectorAll('.testimonials .pager a');
let testimonialsLists = document.querySelectorAll('.testimonials_list li');
let paginationUp = document.querySelector('.pagination .up');
let paginationDown = document.querySelector('.pagination .down');
let currentIdx = 0;
let testimonialCount = testimonialsLists.length;
let partnerList = document.querySelector('.partner_list');
let partnerListWidth = 234;
let partnerListCount = document.querySelectorAll('.partner_list li').length;
let partnerListLeft = 0;
let partnerListTotalWidth = partnerListWidth * partnerListCount;
let animation;
let bookATrip = document.querySelector('.book_a_trip');
let bookATripOST = bookATrip.offsetTop - 300;
let progressBar = document.querySelector('.progress_bar');
let bar = document.querySelector('.progress_bar .bar');
let onGoingPercent = document.querySelector('.ongoing .percent');

partnerList.style.width = partnerListTotalWidth+'px';

function movePartnerList(){
  //partnerListLeft = partnerListLeft - 5;
  partnerListLeft -= 2;
  if(partnerListLeft === -partnerListTotalWidth/2){
    partnerListLeft = 0;
  }
  partnerList.style.left = partnerListLeft+'px';
  animation = requestAnimationFrame(movePartnerList);
}
requestAnimationFrame(movePartnerList);

partnerList.addEventListener('mouseenter',()=>{
  cancelAnimationFrame(animation)
});
partnerList.addEventListener('mouseleave',()=>{
  requestAnimationFrame(movePartnerList);
});


pagers.forEach((item,idx)=>{
  item.addEventListener('click',(e)=>{
    e.preventDefault();
    showTestimonial(idx);
  });
});
function showTestimonial(num){
  /*
    if(num === -1){
      num = testimonialCount -1;
    } else if (num === 3){
      num = 0
    } else{
      num = num; 
    }
 
  num = (num === -1) ? testimonialCount -1 : (num === 3) ? 0: num;
   */
  num = (num + testimonialCount) % testimonialCount; 
  /*
  num = (1+3) % 3 = 1
  num1 num1

  num = (2+3) % 3 = 2
  num2 num2

  num = (3+3) % 3 = 0
  num3 num0
  */

  for(let testimonial of testimonialsLists){
    testimonial.classList.remove('active');
  }
  testimonialsLists[num].classList.add('active');
  currentIdx = num;

  for(let pager of pagers){
    pager.classList.remove('active');
  }
  pagers[num].classList.add('active');

}

paginationDown.addEventListener('click',()=>{
  showTestimonial(currentIdx + 1);
});
paginationUp.addEventListener('click',()=>{
  showTestimonial(currentIdx - 1);
});

window.addEventListener('scroll',()=>{
  let scrollAmt = window.scrollY;
  if(scrollAmt >= bookATripOST){
    if(!bookATrip.classList.contains('active')){
      bookATrip.classList.add('active');
      onGoingNumAnimation();
    }
  }  
});

function onGoingNumAnimation(){
  let targetNum = Number(bar.getAttribute('data-rate'));
  let num = 0;
  let animation = setInterval(()=>{
    num += 1;
    bar.style.width = num+'%';
    onGoingPercent.innerHTML = num+'%';
    if(num === targetNum){
      clearInterval(animation);
    }
  },50);
}