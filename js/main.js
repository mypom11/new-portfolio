//scroll effect
let winh = $(window).height();
let sct;
let wheel = false;
let worksPage = 0;
let slide = false;
let currentSection = 0;

//resize
$('section').height(winh);
$(window).on("resize", function(){
  winh = $(window).height();
  $('section').height(winh);
});

$(window).on('scroll',function(){
  sct = $(this).scrollTop();
  winh = $(this).height();
  if(sct >= winh*5 && sct < winh*6){
    slide = true;
  }else{
    slide = false
  }
  for(let i = 0; i < $('section').length; i++){
    if(sct >= i*winh && sct < (i+1)*winh){
        $('section').removeClass('on');
        $('section').eq(i).addClass('on');
    }
  }
})
const sections = document.querySelectorAll('section')

$('section').on('mousewheel',function(e){
  e.preventDefault();
  if(!wheel){
    wheel = true;
    setTimeout(()=>{
      wheel = false;
    },1000)
    if(!slide){
      if(e.originalEvent.deltaY > 0){
        currentSection++
        if(currentSection > $('section').length ){
          currentSection = $('setions').length
        }
        pageMover()
      }else{
        currentSection--
        if(currentSection < 0 ){
          currentSection = 0
        }
        pageMover()
      }
    }else{
      if(e.originalEvent.deltaY > 0){
        worksPage++
        if(worksPage > $('.works').length){   
          currentSection++
          pageMover()
          worksPage =  $('.works').length;
        }else{
          $('#works').css('left',`${worksPage*-100}vw`);
        }
      }else{
        worksPage--
        if(worksPage < 0){
          currentSection--
          pageMover()
          worksPage = 0
        }else{
          $('#works').css('left',`${worksPage*-100}vw`);
        }
      }
    }
  } 
})

function pageMover(){
  let index = sections[currentSection].offsetTop;
  $('body,html').stop().animate({scrollTop:index},600) 
  console.log(index)
}

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

$('.introduce').on('click', function(e){
  e.preventDefault()
  alert('코드 리뷰 페이지 준비중입니다.')
})