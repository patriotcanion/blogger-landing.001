!function(){const e={name:"Bổ não QA Gingko Biloba",price:25e4},t={active:!0,opt_01:{quantity:1,percent:20.4},opt_02:{quantity:3,percent:30},opt_03:{quantity:6,percent:36}},o={active:!0,minQuantity:2,minOrderCost:5e5,percent:15},n={active:!0,baseShipCost:2e4,minOrderCost:3e5,percent:15},i=document.querySelector("#form-shopping-product > span"),s=document.querySelector("#form-shopping-price > span"),a=document.querySelector("#form-shopping-quantity > span"),r=a.querySelector("input"),l=document.querySelector("#form-shopping-actualCost > span"),c=document.querySelector("#form-shopping-discount > span"),d=document.querySelector("#form-shopping-shipCost > span"),u=document.querySelector("#form-shopping-lastCost > span");i.textContent=e.name;let p=document.createElement("small");p.innerHTML=`Đơn trên ${k(n.minOrderCost-1e3,0)}<sup>đ</sup> miễn phí vận chuyển, giảm thêm ${n.percent}% cho đơn trên ${k(o.minOrderCost-1e3,0)}`,i.after(p),s.innerHTML=k(e.price,0)+"<sup>đ</sup>",w(r.value);const h=document.querySelector("#bb-form-contact-name > input"),m=document.querySelector("#bb-form-contact-phone > input"),f=document.querySelector("#bb-form-contact-address > input"),b=document.querySelector("#bb-form-contact-message > textarea"),v=document.querySelector("input.contact-form-button.contact-form-button-submit"),g=document.querySelector("p.contact-form-error-message"),S=[];[h,m,f].forEach(((e,t)=>{e.addEventListener("input",(o=>{let n;o.preventDefault(),0===t?(n=e.value.length>0,g.textContent="Tên khách hàng đang bị bỏ trống"):1===t?(n=10===e.value.length,g.textContent="Số điện thoại chưa đúng (10 số)",e.value=e.value.replace(/\D+/g,""),e.setAttribute("maxlength","10")):(n=e.value.length>=15,g.textContent="Thông tin phải chứa 15 ký tự trở lên"),n?(S[t]=1,e.style.cssText="background-color: none",g.textContent=""):(S[t]=0,e.style.cssText="background-color: #F2CAC8");if(S.reduce(((e,t)=>e*t))){const e="\n\n"+"-".repeat(50)+"\n\n";document.querySelector("textarea.contact-form-email-message").textContent=`${i.textContent}\nSố lượng: ${r.value} hộp\nPhải thu: ${u.textContent}\nPhí v.chuyển: ${d.textContent}${e}Tên khách: ${h[0].value}\nĐiện thoại: ${m[0].value}\nĐịa chỉ: ${f[1].value}${e}${b[2].value}`,document.querySelector("input.contact-form-email").value="mail@mail.mail",v.disabled=!1}else v.disabled=!0}))})),function(){const o=document.querySelector("#pricing");if(o&&t.active){const n=Object.values(t);[o.querySelector(".regular"),o.querySelector(".popular-plan"),o.querySelector(".best-value-plan")].forEach(((t,o)=>{const i=e.price*(100-n[o+1].percent)/100;t.querySelector(".price").innerHTML=`${k(i,1e3)}`,t.querySelector(".total").innerHTML=`(Tổng ${k(i*n[o+1].quantity,1e3)})`,t.querySelector(".save").innerHTML=`Giảm ${k(n[o+1].percent,1)}%`,t.dataset.bbOrderstart=n[o+1].quantity}))}}();const y=document.querySelector("#bb-contact-form");function w(i){let a=parseInt(i,10)*e.price,r=[],p=0,h=0;if(o.active&&(i>=o.minQuantity||a>=o.minOrderCost)&&r.push(a*o.percent/100),t.active){let e=Object.values(t).map((e=>{if(i>=e.quantity)return e.percent}));e=e.filter(Boolean),e.length&&(e=e.reduce(((e,t)=>e>t?e:t)),r.push(a*e/100))}r.length?(r=r.reduce(((e,t)=>e.quantity<t.quantity?e:t)),p=a-r):r=0,n.active&&p<n.minOrderCost&&(h=n.baseShipCost),s.innerHTML=`${k(p/i,1e3)}<sup>đ</sup> \t\t<small><s>${k(e.price,1e3)}<sup>đ</sup></s></small>`,l.innerHTML=`${k(a,1e3)}<sup>đ</sup>`,c.innerHTML=`${k(r,1e3)}<sup>đ</sup>`,d.innerHTML=`${k(h,1e3)}<sup>đ</sup>`,u.innerHTML=`${k(p+h,1e3)}<sup>đ</sup>`}function k(e,t){return Number.isInteger(t)&&t>0&&(e=Math.round(e/t)*t),e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}document.querySelectorAll("[data-bb-orderstart]").forEach((function(e){e.href="javascript:void(0)",e.addEventListener("click",(t=>{t.preventDefault(),function(e){let t=parseInt(e,10);if(!t)return;r.value=t,w(t),a.querySelector("button:nth-last-child(1)").addEventListener("click",(e=>{e.preventDefault(),t++,r.value=t,w(t)})),a.querySelector("button:nth-child(1)").addEventListener("click",(e=>{e.preventDefault(),r.value>1&&t>1&&(t--,r.value=t,w(t))})),r.addEventListener("input",(e=>{e.preventDefault(),r.value=r.value.replace(/\D+/g,""),t=r.value,w(t)}))}(e.dataset.bbOrderstart),y.style.cssText="display: flex; position: fixed"}))})),document.querySelector("[data-bb-orderclose]").onclick=function(){y.style.display="none"},window.onclick=function(e){e.target==y&&(y.style.display="none")}}(),function(e){"use strict";e(window).on("load",(function(){e("#preloader").delay(0).fadeOut(),function(){var t=e(".slider-active");function o(t){var o="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";t.each((function(){var t=e(this),n=t.data("delay"),i="animated "+t.data("animation");t.css({"animation-delay":n,"-webkit-animation-delay":n}),t.addClass(i).one(o,(function(){t.removeClass(i)}))}))}t.on("init",(function(t,n){o(e(".single-slider:first-child").find("[data-animation]"))})),t.on("beforeChange",(function(t,n,i,s){o(e('.single-slider[data-slick-index="'+s+'"]').find("[data-animation]"))})),t.slick({autoplay:!1,autoplaySpeed:1e4,dots:!1,fade:!0,arrows:!1,responsive:[{breakpoint:767,settings:{dots:!1,arrows:!1}}]})}(),new WOW({boxClass:"wow",animateClass:"animated",offset:0,mobile:!1,live:!0}).init()}));var t=e(".section-link");if(e(window).scroll((function(){var o=e(this).scrollTop();t.each((function(){e(this.hash).offset().top-90<=o&&(e(this).parent().addClass("active"),e(this).parent().siblings().removeClass("active"))}))})),e((function(){e('a.section-link[href*="#"]:not([href="#"])').on("click",(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=e(this.hash);if((t=t.length?t:e("[name="+this.hash.slice(1)+"]")).length)return e("html, body").animate({scrollTop:t.offset().top-80},1200,"easeInOutExpo"),!1}}))})),e(".menu-area li.menu-item-has-children ul").length&&e(".menu-area .navigation li.menu-item-has-children").append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'),e(".mobile-menu").length){var o=e(".menu-area .main-menu").html();e(".mobile-menu .menu-box .menu-outer").append(o),e(".mobile-menu li.menu-item-has-children .dropdown-btn").on("click",(function(){e(this).toggleClass("open"),e(this).prev("ul").slideToggle(500)})),e(".mobile-nav-toggler").on("click",(function(){e("body").addClass("mobile-menu-visible")})),e(".menu-backdrop, .mobile-menu .close-btn, .mobile-menu .navigation li a").on("click",(function(){e("body").removeClass("mobile-menu-visible")}))}e(".header-btn a").on("click",(function(){e("html, body").animate({scrollTop:e("#shop").offset().top},1200,"easeInOutExpo")})),e("[data-background]").each((function(){e(this).css("background-image","url("+e(this).attr("data-background")+")")})),e("[data-bg-color]").each((function(){e(this).css("background-color",e(this).attr("data-bg-color"))})),e(".header-search > a").on("click",(function(){return e(".search-popup-wrap").slideToggle(),e("body").addClass("search-visible"),!1})),e(".search-backdrop").on("click",(function(){e(".search-popup-wrap").slideUp(500),e("body").removeClass("search-visible")})),e(window).on("scroll",(function(){e(window).scrollTop()<245?(e("#sticky-header").removeClass("sticky-menu"),e(".scroll-to-target").removeClass("open"),e("#header-top-fixed").removeClass("header-fixed-position"),e("#header-fixed-height").removeClass("active-height")):(e("#sticky-header").addClass("sticky-menu"),e(".scroll-to-target").addClass("open"),e("#header-top-fixed").addClass("header-fixed-position"),e("#header-fixed-height").addClass("active-height"))})),e(".scroll-to-target").length&&e(".scroll-to-target").on("click",(function(){var t=e(this).attr("data-target");e("html, body").animate({scrollTop:e(t).offset().top},1e3)})),e(".navSidebar-button").on("click",(function(){return e("body").addClass("offcanvas-menu-visible"),!1})),e(".offCanvas-overlay, .offCanvas-toggle").on("click",(function(){e("body").removeClass("offcanvas-menu-visible")})),e(".brand-active").slick({dots:!1,infinite:!0,speed:1e3,autoplay:!0,arrows:!1,slidesToShow:6,slidesToScroll:2,responsive:[{breakpoint:1200,settings:{slidesToShow:5,slidesToScroll:1,infinite:!0}},{breakpoint:992,settings:{slidesToShow:4,slidesToScroll:1}},{breakpoint:767,settings:{slidesToShow:3,slidesToScroll:1,arrows:!1}},{breakpoint:575,settings:{slidesToShow:2,slidesToScroll:1,arrows:!1}}]}),e((function(){e(".accordion-collapse").on("show.bs.collapse",(function(){e(this).parent().addClass("active-item"),e(this).parent().prev().addClass("prev-item")})),e(".accordion-collapse").on("hide.bs.collapse",(function(){e(this).parent().removeClass("active-item"),e(this).parent().prev().removeClass("prev-item")}))})),e(".home-shop-active").slick({dots:!0,infinite:!0,speed:1e3,autoplay:!0,arrows:!0,slidesToShow:4,prevArrow:'<button type="button" class="slick-prev"><i class="flaticon-left-arrow"></i></button>',nextArrow:'<button type="button" class="slick-next"><i class="flaticon-right-arrow"></i></button>',slidesToScroll:1,responsive:[{breakpoint:1500,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0}},{breakpoint:1200,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0}},{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:767,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}},{breakpoint:575,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]}),e(".related-product-active").slick({dots:!0,infinite:!0,speed:1e3,autoplay:!0,arrows:!0,slidesToShow:4,prevArrow:'<button type="button" class="slick-prev"><i class="flaticon-left-arrow"></i></button>',nextArrow:'<button type="button" class="slick-next"><i class="flaticon-right-arrow"></i></button>',slidesToScroll:1,responsive:[{breakpoint:1500,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0}},{breakpoint:1200,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0}},{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:767,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}},{breakpoint:575,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]}),e(".testimonial-active").slick({dots:!0,infinite:!0,speed:1e3,autoplay:!0,arrows:!0,slidesToShow:1,prevArrow:'<button type="button" class="slick-prev"><i class="flaticon-left-arrow"></i></button>',nextArrow:'<button type="button" class="slick-next"><i class="flaticon-right-arrow"></i></button>',slidesToScroll:1,responsive:[{breakpoint:1200,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0}},{breakpoint:992,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}},{breakpoint:767,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}},{breakpoint:575,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]}),e(".instagram-active").slick({dots:!1,infinite:!0,speed:1e3,autoplay:!0,arrows:!1,swipe:!1,slidesToShow:5,slidesToScroll:1,responsive:[{breakpoint:1200,settings:{slidesToShow:5,slidesToScroll:1,infinite:!0}},{breakpoint:992,settings:{slidesToShow:4,slidesToScroll:1}},{breakpoint:767,settings:{slidesToShow:3,slidesToScroll:1,arrows:!1}},{breakpoint:575,settings:{slidesToShow:2,slidesToScroll:1,arrows:!1}}]}),e(".blog-thumb-active").slick({dots:!1,infinite:!0,arrows:!0,speed:1500,slidesToShow:1,slidesToScroll:1,fade:!0,prevArrow:'<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',nextArrow:'<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>'}),e(".jarallax").jarallax({speed:.2}),e("#paroller").length&&e(".paroller").paroller(),e(".popup-image").magnificPopup({type:"image",gallery:{enabled:!0}}),e(".popup-video").magnificPopup({type:"iframe"}),e("#slider-range").slider({range:!0,min:20,max:400,values:[120,280],slide:function(t,o){e("#amount").val("$"+o.values[0]+" - $"+o.values[1])}}),e("#amount").val("$"+e("#slider-range").slider("values",0)+" - $"+e("#slider-range").slider("values",1)),e(".fact-item").on("inview",(function(t,o){o&&e(".chart").easyPieChart({scaleLength:0,lineWidth:6,trackWidth:6,size:70,lineCap:"round",rotate:360,trackColor:"#F4F4F4",barColor:"#FAA432"})})),e(".quickview-cart-plus-minus").append('<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>'),e(".qtybutton").on("click",(function(){var t=e(this),o=t.parent().find("input").val();if("+"==t.text())var n=parseFloat(o)+1;else if(o>0)n=parseFloat(o)-1;else n=0;t.parent().find("input").val(n)})),e(".grid").imagesLoaded((function(){var t=e(".grid").isotope({itemSelector:".grid-item",percentPosition:!0,masonry:{columnWidth:".grid-item"}});e(".portfolio-menu").on("click","button",(function(){var o=e(this).attr("data-filter");t.isotope({filter:o})}))})),e(".product-license li").on("click",(function(t){e(this).siblings(".active").removeClass("active"),e(this).addClass("active"),t.preventDefault()}))}(jQuery);
