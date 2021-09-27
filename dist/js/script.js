// Animation scroll
document.addEventListener('DOMContentLoaded', () => {
    const headerBlock = document.querySelector('.header__block');
    const header = document.querySelector('.header');
    const  scrollItems = document.querySelectorAll('.scroll-item');

    const scrollAnimation = () => {
      let windowCenter = (window.innerHeight / 2) + window.scrollY;
     
      scrollItems.forEach(el => {
        let scrollOffset = (el.offsetTop  )+ (el.offsetHeight / 2);
          console.log(scrollOffset);
        if (windowCenter >= scrollOffset) {
          el.classList.add('animation-class');
        } else {
          el.classList.remove('animation-class');
        }

      });
    };

    const headerFixed = () => {
      let scrollTop = window.scrollY;
      let headerBlockCenter = headerBlock.offsetHeight / 2;
    
     if (scrollTop => headerBlockCenter) {
        header.classList.add('fixed');
        headerBlock.getElementsByClassName.marginTop =`${header.offsetHeight}px`; 
        } else {
        header.classList.remove('fixed');
        headerBlock.getElementsByClassName.marginTop = '0px'; 

        }
    };

    scrollAnimation();
    window.addEventListener('scroll', () => {
      //headerFixed();
      scrollAnimation();
    });
});


// part two

let animItems = document.querySelectorAll('._anim-items');


if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
 setTimeout(() => {
  animOnScroll();
 }, 300);
}

function animOnScroll() {
  for (let i = 0; i < animItems.length; i++) {
    const animItem = animItems[i];
    const animItemHeight = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;
    const animStart = 4;

    let animItemPoint = window.innerHeight - animItemHeight / animStart;

    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }
    
    if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
      animItem.classList.add('_active');
    } else {    
        if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('_active');        
        }    
    }
  }
}

function offset(el) {
  const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft};
}

// Modal Close / Open

$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
});

$('.modal__close, .back-home').on('click', function () {
   $('.overlay, #consultation, #thanks').fadeOut('slow');
});


//=== Validate form =============================//

$('#consultation form').validate({
  rules: {
    firstName:  {
      required: true,
      minlength: 2
    },
   lastName: "required",
    phone: "required"
  },
  messages: {
    firstName: 
    {
      required: "Пожалуйста введите свою фамилию",
      minlength: jQuery.validator.format("Введите {0} символа!")
    },
   lastName: "Пожалуйста введите свое имя",
    phone: "Пожалуйста введите свой телефон",
    email: {
      required: "Пожалуйста введите свою почту",
      email: "Неправильно введен адресс почты name@domain.com"
    }
  }
});

function validateForms(form) {
  $(form).validate({
    rules: {
      firstName:  {
        required: true,
        minlength: 2
      },
     lastName: "required",
      phone: "required"
    },
    messages: {
      firstName: 
      {
        required: "Пожалуйста введите свою фамилию",
        minlength: jQuery.validator.format("Введите {0} символа!")
      },
     lastName: "Пожалуйста введите свое имя",
      phone: "Пожалуйста введите свой телефон",
      email: {
        required: "Пожалуйста введите свою почту",
        email: "Неправильно введен адресс почты name@domain.com"
      }
    }
  });
}

validateForms('#consultation form');


// == Mask phone ======================================//
$('input[name=phone]').mask("+38(999) 999-99-99");


//=============time ZOne ===========//
// let date = new Date();
// let tZone = document.querySelector('#time-zone');
// tZone.value += date.getHours()  + ' : ' + date.getMinutes();
// //console.log(tZone.value);


//====== Form - feed ========================//



$(function() {
  $(".feed-form").submit(function (event) {
   
   if($('.reg1').val() == "") return;    
   if($('.reg2').val() == "") return;    
   if($('.reg3').val() == "") return;    
     event.preventDefault();

    // Ссылка, которую получили на этапе публикации приложения
    let appLink = "https://script.google.com/macros/s/AKfycbxTPyLeeXoEC7z1x71TtTEfoV9QkzmKkgOy_g6H-Q/exec";
 
    // Сообщение при успешной отправке данных
    let successRespond = 'Сообщение успешно отправлено. Посмотрите результат <a target="_blank" href="https://docs.google.com/spreadsheets/d/1ct9vdiOK4GgQ99UFcC7eDSjW6pfiCGNR4KysMPJn7z4/edit?usp=sharing">тут</a>';
 
    // Сообщение при ошибке в отправке данных
    let errorRespond = 'Не удалось отправить сообщение. Cвяжитесь с администратором сайта по адресу <a href="mailto:landing.migotoni@gmail.com">landing.migotoni@gmail.com</a>';
 
    // Id текущей формы
    let form = $('#' + $(this).attr('id'))[0];
 
    // h2 с ответом формы
    let formRespond = $(this).find('.g-form__title_respond');
 
    // h2 с заголовком формы
    let formTitle = $(this).find('.modal__subtitle'); 
 
    // Блок прелоадера
    let preloader = $(this).find('.g-form__preloader');
 
    // Кнопка отправки формы
    let submitButton = $(this).find('.btn_submit-push');

    // FormData
    let fd = new FormData(form);
     
       
    $.ajax({
 
      url: appLink,
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      beforeSend: function(){
 
        if(fd.get('honeypot').length) {
          return false;
        } else {
          fd.delete('honeypot');
        }
 
      // Показываем прелоадер
      preloader.css('opacity', '1');
 
      // Делаем неактивной кнопку отправки
      submitButton.prop('disabled', true);
 
      // валидация других полей.
 
    },
 
  }).done(function(res, textStatus, jqXHR) {
 
    if(jqXHR.readyState === 4 && jqXHR.status === 200) {
 
    // Прячем заголовок формы
    formTitle.css({
      'display': 'none'
    });
 
    // Прячем прелоадер
    preloader.css('opacity', '0');
 
    // Выводим ответ формы.
    formRespond.html(successRespond).css('color', '#37b599');
     
    // Возвращаем активность кнопке отправки
    submitButton.prop('disabled', false);
    
          $('#consultation').fadeOut();
           $('.overlay, #thanks').fadeIn('slow');
             $('form').trigger('reset');
      // Очищаем поля формы
     // form.reset();
 
    } else {
      formTitle.css({
        'display': 'none'
      });
      formRespond.html(errorRespond).css('color', '#c64b4b');
      preloader.css('opacity', '0');
      setTimeout( () => {
        formRespond.css({
          'display': 'none'
        });
        formTitle.css({
          'display': 'block'
        });
 
        submitButton.prop('disabled', false);
      }, 5000);
 
      console.log('Гугл не ответил статусом 200');
    }
  }).fail(function(res, textStatus, jqXHR) {
    formTitle.css({
      'display': 'none'
    });
    preloader.css('opacity', '0');
    formRespond.html('Не удалось отправить сообщение. Cвяжитесь с администратором сайта другим способом').css('color', '#c64b4b');
    setTimeout( () => {
      formRespond.css({
        'display': 'none'
      });
      formTitle.css({
        'display': 'block'
      });
      submitButton.prop('disabled', false); 
    }, 5000);
 
    console.log('Не удалось выполнить запрос по указанному в скрипте пути');
  }); 
});
}(jQuery));