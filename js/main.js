//scroll effect
let winh;
let sct;
let wheel = false;
let worksPage = 0;

$(window).on('scroll',function(e){
  sct = $(this).scrollTop();
  winh = $(this).height();
  
  for(let i = 0; i < $('section').length; i++){
    if(sct >= i*winh && sct < (i+1)*winh){
        $('section').removeClass('on');
        $('section').eq(i).addClass('on');
    }
  }
})
$('section').on('mousewheel',function(e){
  e.preventDefault();
  if(!wheel){
    wheel=true;
    setTimeout(()=>{
      wheel = false;
    },1000)
    if(sct != 5*winh){
      if(e.originalEvent.deltaY > 0){
        let nextTop = $(this).next().offset().top;
        $('body,html').stop().animate({scrollTop:nextTop},600)   
      }else{
        let prevTop = $(this).prev().offset().top;
        $('body,html').stop().animate({scrollTop:prevTop},600) 
      }
    }else{
      if(e.originalEvent.deltaY > 0){
        worksPage++
        if(worksPage > $('.works').length){
          let nextTop = $(this).next().offset().top;
          $('body,html').stop().animate({scrollTop:nextTop},600)
          worksPage =  $('.works').length;
        }else{
          $('#works').css('left',`${worksPage*-100}vw`);
        }
      }else{
        worksPage--
        if(worksPage < 0){
          let prevTop = $(this).prev().offset().top;
          $('body,html').stop().animate({scrollTop:prevTop},600)
          worksPage = 0
        }else{
          $('#works').css('left',`${worksPage*-100}vw`);
        }
      }
    }
  } 
})

//nav event
$('.nav_btn').on('click',function(){
  $('nav').toggleClass('on');
})
$('nav li').on('click',function(e){
  e.preventDefault();
  worksPage = 0;
  $('#works').css('left',`${worksPage*-100}vw`);
  $('section').removeClass('on');
  $('section').eq(e.target.dataset.num).addClass('on');
  $('body,html').animate({scrollTop:$('section').eq(e.target.dataset.num).offset().top},600)
})

//visual typing
let textNum = 0;
const text = 'Jeongki\'s Portfolio'; 

typing()
function typing() {
  if (textNum < text.length) {
    document.querySelector('.visual_text').innerHTML += text.charAt(textNum);
    textNum++;
    setTimeout(typing, 150);
  }
}

//aside onclick

$('.aside_btn').on('click', function(e){
  e.preventDefault()
  $('aside').toggleClass('on');
})

//skills onclick

$('.skills_btn').on('click', function(e){
  e.preventDefault();
  $('.folder').addClass('on');
})

$('.status_bar a:eq(0), .status_bar a:eq(1)').on('click', function(e){
  e.preventDefault();
  $('.folder').removeClass('on');
  $('.folder').removeClass('full');
  $('.folder').removeClass('detail');
  $('.depth2').removeClass('full');
})

$('.status_bar a:eq(2)').on('click', function(e){
  e.preventDefault();
  $('.folder').toggleClass('full');
})

//folder event
let detail;
$('.depth1 li').on('click', function(e){
  detail = $(this).attr('data-num');
  if(detail){
    $('.folder').addClass('detail');
    $('.depth2 ul').removeClass('on');
    $('.depth2 ul').eq(detail).addClass('on');
  }else{
    $('.folder').removeClass('detail');
  }
})
let imgNum;
let imgUrl;
const subject = ['css','js','jquery','ai']
$('.depth2 li').on('mouseenter',function(e){
  imgNum= $(this).index();
  imgUrl = `images/${subject[detail]+imgNum}.jpg`
  $('.big_img').css({'display':'block', 'background-image':`url(${imgUrl})`});
})
$('.depth2 li').on('mouseleave',function(e){
  $('.big_img').css('display','none');
})
$('.depth2 .ai li').on('click',function(e){
  $('.depth2').addClass('full');
  $('.big_img').css('background-image',`url(${imgUrl})`);
  setTimeout(()=>{
    $('.big_img').css('display','block');
  },300)
})

$('.big_img span').on('click',function(){
  type = $(this).attr('class');
  switch (type){
    case 'left':
      imgNum--
      if(imgNum < 0){
        imgNum = 9;
      }
      imgChanger()
      break
    case 'right':
      imgNum++
      if(imgNum > 9){
        imgNum = 0;
      }
      imgChanger()
      break
    case 'close':
    $('.depth2').removeClass('full');
      break
  }
})

function imgChanger(){
  imgUrl = `images/ai${imgNum}.jpg`
  $('.big_img').css('background-image',`url(${imgUrl})`)
}