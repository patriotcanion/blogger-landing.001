
function BB_rawDatabase(){

    const bb_productData = {
        product: {fullName: 'Bổ não QA Gingko Biloba', shortName: 'BoNaoQa', price: 250000},
        options: {
            active: true,
            opt_01: {quantity: 1, percent: 20.4},
            opt_02: {quantity: 3, percent: 26},
            opt_03: {quantity: 6, percent: 33.4}
        },
        promotion: {active: true, minQuantity: 2, minOrderCost: 500000, percent: 15},
        shipping: {active: true, baseShipCost: 20000, minOrderCost: 300000, percent: 15}
    }
    const bb_sellerData = {
        store: {onlineUrl: 'https://bio.linhdan.top/', offlineUrl: 'https://bio.linhdan.top/'},
        address: '24/1/2A2 Chương Dương, Trần Phú, Hải Dương',
        phone: '0857319366',
        // zalo: {note: 'liên hệ qua zalo'},
        zalo: {url01: 'https://zalo.me/', url02: 'https://zaloapp.com/qr/p/z29xq2umx020/'},
        messenger: {url01: 'https://m.facebook.com/msg/104636079259132', url02: 'https://m.me/mslinhdan.me'},
        email: 'hello@linhdan.top',
        website: 'linhdan.top',
        shopee: {url01: 'https://s.shopee.vn/B9GPoax30'}
    }
    return {product: bb_productData, seller: bb_sellerData};
}


function BB_preciousStone(){

// bb_facebookPixel.fbpixel();

const bb_database = BB_rawDatabase();
const bb_productData = bb_database.product;
const bb_sellerData = bb_database.seller;
const bb_facebookPixel = BB_facebookPixelController();


function BB_modalOderAndContactForm(){
    const bb_modal = document.querySelector('#bb-contact-form');
    if(!bb_modal) return;

    const bb_productName = bb_modal.querySelector('#form-shopping-product > span');
    const bb_productPrice = bb_modal.querySelector('#form-shopping-price > span');
    const bb_productQuantityArea = bb_modal.querySelector('#form-shopping-quantity > span');
    const bb_billQuantity = bb_productQuantityArea.querySelector('input');
    const bb_billTotalCost = bb_modal.querySelector('#form-shopping-actualCost > span');
    const bb_billPromoCost = bb_modal.querySelector('#form-shopping-discount');
    const bb_billShipCost = bb_modal.querySelector('#form-shopping-shipCost > span');
    const bb_billLastTotalCost = bb_modal.querySelector('#form-shopping-lastCost > span');

    let bb_orderRecord = localStorage.getItem('bb_orderData');
    bb_orderRecord = (typeof bb_orderRecord === 'string') ? JSON.parse(bb_orderRecord) : {
        clientName: '', clientPhone: '', clientAddress: '', clientMessage: '',
        fullName: bb_productData.product.fullName, shortName: bb_productData.product.shortName,
        quantity: 0, sumTotal: 0, shipCost: 0
    };

    BB_modalFormDesigner();
    BB_priceEstimator(bb_billQuantity.value);
    BB_landingPageAdditionDisplayer();

    document.querySelectorAll('[data-bb-orderstart]').forEach(function(elem){
        elem.href = 'javascript:void(0)';
        elem.addEventListener('click', (event) => {
            event.preventDefault();
            BB_itemQuantityMatcher(elem.dataset.bbOrderstart);
            bb_modal.style.cssText = 'display: flex; position: fixed';
        });
    });
    bb_modal.querySelector('[data-bb-orderclose]').onclick = function(){bb_modal.style.display = 'none'}
    window.onclick = function(event) {if(event.target == bb_modal) bb_modal.style.display = 'none'}

    BB_orderBillSender();


///////////////////////////////////////////////


    function BB_modalFormDesigner(){
        bb_productName.textContent = bb_productData.product.fullName;
        let bb_tempNode = document.createElement('small');
        bb_tempNode.innerHTML = `Đơn trên ${BB_numberDotSeparator(bb_productData.shipping.minOrderCost-1000, 0)}<sup>đ</sup> miễn phí vận chuyển, giảm thêm ${bb_productData.shipping.percent}% cho đơn trên ${BB_numberDotSeparator(bb_productData.promotion.minOrderCost-1000, 0)}`;
        bb_productName.after(bb_tempNode);
        bb_productPrice.innerHTML = BB_numberDotSeparator(bb_productData.product.price, 0) + '<sup>đ</sup>';

        bb_tempNode = document.createElement('style');
        bb_tempNode.textContent = ':root {--width: 320px; --fontSize: 16px} \
            #bb-contact-form {display: none; position: absolute; z-index: 100; left: 0; top: 0; justify-content: center; align-items: center; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, .4)} \
            #ContactForm1 {font-size: var(--fontSize); width: 375px; padding-top: 35px; padding-bottom: 35px; margin: auto; background-color: #F7F6F4} \
            #ContactForm1 .contact-form-widget {width: var(--width); margin: auto} \
            #ContactForm1 .title {display: none; width: var(--width); margin: 10px auto 35px auto; font-size: 30px; font-weight: 300} \
            #bb-contact-form button, #bb-contact-form input[inputmode=numeric], #bb-contact-form input[type=text], #bb-contact-form textarea {font-family: inherit; font-size: var(--fontSize); border: none; outline: #E59802} \
            #bb-contact-form button, *[data-bb-orderstart], *[data-bb-orderclose] {cursor: pointer} \
            #bb-contact-form fieldset {border: none; padding: unset; margin-bottom: 25px!important} \
            form[name="shopping-form"] label {display: inline-block; width: 150px} \
            #form-shopping-price > span, #form-shopping-quantity > span, #form-shopping-actualCost > span, #form-shopping-discount > span, #form-shopping-shipCost > span {float: right} \
            #form-shopping-product > span {display: inline-block; width: 100%; font-size: 19px; font-weight: 700; line-height: 1.5; word-spacing: -2px} \
            #form-shopping-product > small {font-weight: 500; color: #0c80e3; margin-top: 10px; display: inline-block; font-size: 14px} \
            span[data-bb-orderclose=""] {float: right; height: 48px; font-size: 38px; color: #dfb1ab; line-height: 1} \
            span[data-bb-orderclose=""] > i {vertical-align: middle} \
            span[data-bb-orderclose=""]:hover {color: #575A6D} \
            /* input.bb-form-control {margin-left: 10px; float: right; background-color: #ED6B5B} \
            input.bb-form-control:hover {background-color: #575A6D} */ \
            #form-shopping-quantity > label {padding: 10px 0;} \
            #form-shopping-quantity > span {display: inline-flex; border-radius: 10px; overflow: hidden; border: 1px solid #5e99f6} \
            #form-shopping-quantity > span > button {outline: 0; padding: 10px 15px; width: 40px} \
            #form-shopping-quantity > span > input {text-align: center; width: 65px; padding: 10px; background-color: #f8f8f8} \
            #form-shopping-quantity > span > button {color: #5e99f6; background-color: #FFFFFF} \
            #form-shopping-quantity > span > button:hover {background-color: #e6e6e6} \
            #form-shopping-lastCost {font-weight: 700; border: 3px solid lightgrey!important; border-radius: 10px; padding: 0 0 20px 0!important; margin-top: 35px} \
            #form-shopping-lastCost > span {color: #7e993f; display: block; font-size: 28px; text-align: center} \
            #form-shopping-lastCost > label {font-size: inherit; background: #f7f6f4; width: 200px; position: relative; top: -15px; margin: auto; font-weight: 400; text-transform: uppercase; display: block; text-align: center} \
            #form-contact-email, #form-contact-message, #form-contact-name {display: none} \
            #ContactForm1_contact-form-submit, #bb-form-contact-address > input, #bb-form-contact-message > textarea, #bb-form-contact-name > input, #bb-form-contact-phone > input {width: var(--width); border: unset; border:1px solid #5e99f6; border-radius: 4px; height: 42px; padding: 8px 15px; line-height: 1.5; margin: auto; display: block; box-sizing: border-box} \
            #bb-form-contact-message {display: none} \
            #bb-form-contact-message > textarea {height: 100px; resize: none} \
            #ContactForm1_contact-form-submit, .bb-form-control {color: #FFFFFF; font-weight: 700; width: 180px; height: 48px; border-radius: 30px; font-size: var(--fontSize); text-transform: uppercase; background-color: #3786C9; border: none; display: inline-block} \
            #ContactForm1_contact-form-submit:hover, .bb-form-control:hover {background-color: #94B447} \
            .form-notification > p {width: var(--width); color: #F2CAC8; display: initial; margin: 15px auto}';
        bb_modal.before(bb_tempNode);
    }


    function BB_orderBillSender(){
        const bb_contactName = bb_modal.querySelector('#bb-form-contact-name > input');
        const bb_contactPhone = bb_modal.querySelector('#bb-form-contact-phone > input');
        const bb_contactAddress = bb_modal.querySelector('#bb-form-contact-address > input');
        const bb_contactMessage = bb_modal.querySelector('#bb-form-contact-message > textarea');
        const bb_contactMessageOriginal = bb_modal.querySelector('textarea.contact-form-email-message');
        const bb_formSubmission = bb_modal.querySelector('input.contact-form-button.contact-form-button-submit');
        const bb_notification = bb_modal.querySelector('p.contact-form-error-message');
        bb_modal.querySelector('input.contact-form-email').value = bb_sellerData.email;

        bb_contactName.value = bb_orderRecord.clientName;
        bb_contactPhone.value = bb_orderRecord.clientPhone;
        bb_contactAddress.value = bb_orderRecord.clientAddress;
        bb_contactMessageOriginal.textContent = bb_orderRecord.clientMessage;

        const bb_requiredNodes = [bb_contactName, bb_contactPhone, bb_contactAddress];
        let bb_actionFlag = bb_contactInputValidator();

        bb_requiredNodes.forEach((item) => {
            item.addEventListener('input', (event) => {
                event.preventDefault();
                bb_actionFlag = bb_contactInputValidator();
                if(bb_actionFlag){
                    const bb_breaker = '\n\n'+'-'.repeat(50)+'\n\n';
                    const bb_today = new Date().toLocaleDateString('en-ZA');
                    const bb_time = new Date().toLocaleTimeString('en-ZA', {hour12: false, hour: 'numeric', minute: 'numeric'});

                    bb_orderRecord.clientName = bb_contactName.value;
                    bb_orderRecord.clientPhone = bb_contactPhone.value;
                    bb_orderRecord.clientAddress = bb_contactAddress.value;
                    bb_orderRecord.clientMessage =
                        `${bb_productName.textContent}\nSố lượng: ${bb_billQuantity.value} hộp\n` +
                        `Phải thu: ${bb_billLastTotalCost.textContent}\nPhí v.chuyển: ${bb_billShipCost.textContent}${bb_breaker}` +
                        `Tên khách: ${bb_contactName.value}\nĐiện thoại: ${bb_contactPhone.value}\nĐịa chỉ: ${bb_contactAddress.value}${bb_breaker}` +
                        `Lưu file CSV:\n"${bb_today}","${bb_time}","${bb_orderRecord.fullName}","${bb_orderRecord.quantity}","${bb_orderRecord.sumTotal}","${bb_orderRecord.shipCost}","${bb_contactName.value}","${bb_contactPhone.value}","${bb_contactAddress.value}"${bb_breaker}` +
                        `${bb_contactMessage.value}`;
                    bb_contactMessageOriginal.textContent = bb_orderRecord.clientMessage;
                    localStorage.setItem('bb_orderData', JSON.stringify(bb_orderRecord));
                    bb_formSubmission.value = 'Mua hàng';
                    bb_formSubmission.style = 'background-color: #3786C9; width: 180px;';
                    // bb_facebookPixel.fbtrack(bb_orderRecord); // Cung cấp dữ liệu cho Facebook pixel
                    console.log(111, bb_orderRecord.clientName, bb_orderRecord.clientPhone, bb_orderRecord.clientAddress, bb_orderRecord.clientMessage);
                }else{
                    console.log(222, bb_orderRecord.clientName, bb_orderRecord.clientPhone, bb_orderRecord.clientAddress, bb_orderRecord.clientMessage);
                    bb_formSubmission.value = 'Thiếu thông tin';
                    bb_formSubmission.style = 'background-color: #c36887; width: 220px;';
                }
            });
        });

        /** Thông báo đặt hàng thành công */
        bb_formSubmission.addEventListener('click', (event) => {
            event.preventDefault();
            if(bb_actionFlag){
                console.log(333, bb_orderRecord.clientName, bb_orderRecord.clientPhone, bb_orderRecord.clientAddress, bb_orderRecord.clientMessage);
                bb_formSubmission.value = 'Đặt thành công';
                bb_formSubmission.style = 'background-color: #f79300; width: 220px;';
                setTimeout(() => {
                    bb_modal.querySelector('[data-bb-orderclose]').click();
                    bb_formSubmission.value = 'Mua hàng';
                    bb_formSubmission.style = '';
                }, 2000);
            }else{
                console.log(444, bb_orderRecord.clientName, bb_orderRecord.clientPhone, bb_orderRecord.clientAddress, bb_orderRecord.clientMessage);
                bb_formSubmission.value = 'Thiếu thông tin';
                bb_formSubmission.style = 'background-color: #c36887; width: 220px;';
            }
        });

        function bb_contactInputValidator(){
            const bb_requiredMatcher = [];
            bb_requiredNodes.forEach((item, index) => {
                let bb_variable;
                /** Tạo thông tin cảnh báo điền sai dữ liệu */
                if(index === 0){
                    item.value = item.value.replace(
                    /[^\w\sáàãảạăắằẵẳặâấầẫẩậđéèẽẻẹêếềễểệíìĩỉịóòõỏọôốồỗổộơớờỡởợúùũủụưứừữửựýỳỹỷỵÁÀÃẢẠĂẮẰẴẲẶÂẤẦẪẨẬĐÉÈẼẺẸÊẾỀỄỂỆÍÌĨỈỊÓÒÕỎỌÔỐỒỖỔỘƠỚỜỠỞỢÚÙŨỦỤƯỨỪỮỬỰÝỲỸỶỴ]/g
                    , '');
                    bb_variable = item.value.length > 0;
                    // bb_notification.textContent = 'Tên khách hàng đang bị bỏ trống';
                }else if(index === 1){
                    item.value = item.value.replace(/\D+/g, '');
                    bb_variable = item.value.length === 10;
                    // bb_notification.textContent = 'Số điện thoại chưa đúng (10 số)';
                }else{
                    item.value = item.value.replace(
                    /[^\w\s\+\-\(\)\\\/&\.,áàãảạăắằẵẳặâấầẫẩậđéèẽẻẹêếềễểệíìĩỉịóòõỏọôốồỗổộơớờỡởợúùũủụưứừữửựýỳỹỷỵÁÀÃẢẠĂẮẰẴẲẶÂẤẦẪẨẬĐÉÈẼẺẸÊẾỀỄỂỆÍÌĨỈỊÓÒÕỎỌÔỐỒỖỔỘƠỚỜỠỞỢÚÙŨỦỤƯỨỪỮỬỰÝỲỸỶỴ]/g
                    , '');
                    bb_variable = item.value.length >= 10;
                    // bb_notification.textContent = 'Thông tin phải chứa 10 ký tự trở lên';
                }
                /** Tạo màu cảnh báo điền sai dữ liệu */
                if(bb_variable){
                    bb_requiredMatcher[index] = 1;
                    item.style.cssText = 'background-color: none';
                    bb_notification.textContent = '';
                }else{
                    bb_requiredMatcher[index] = 0;
                    item.style.cssText = 'background-color: #F2CAC8';
                }
            });
            if(bb_requiredNodes.length === bb_requiredMatcher.length){
                console.log(bb_requiredMatcher)
                return bb_requiredMatcher.reduce((product, value) => {return product * value});
            }else{
                return 0
            }
        }
    }


    function BB_priceEstimator(_seekedQuantity){
        let _calculated = parseInt(_seekedQuantity, 10) * bb_productData.product.price;
        let _promoCost = [], _lastTotalCost = 0, _shipCost = 0;

        if(bb_productData.promotion.active){
            if((_seekedQuantity >= bb_productData.promotion.minQuantity) ||
            (_calculated >= bb_productData.promotion.minOrderCost))
                _promoCost.push(_calculated * bb_productData.promotion.percent / 100);
        }

        if(bb_productData.options.active){
            let _percent = Object.values(bb_productData.options).map((value) => {
                if(_seekedQuantity >= value.quantity) return value.percent;
            });
            _percent = _percent.filter(Boolean);
            if(_percent.length) {
                _percent = _percent.reduce((prev, curr) => {return prev > curr ? prev : curr;});
                _promoCost.push(_calculated * _percent / 100);
            }
        };

        if(_promoCost.length){
            _promoCost = _promoCost.reduce((prev, curr) => {return prev.quantity < curr.quantity ? prev : curr;});
            _lastTotalCost = _calculated - _promoCost;
        }else{
            _promoCost = 0;
        }

        if(bb_productData.shipping.active){
            if(_lastTotalCost < bb_productData.shipping.minOrderCost) _shipCost = bb_productData.shipping.baseShipCost;
        }

        bb_billQuantity.value = _seekedQuantity;
        bb_productPrice.innerHTML = `${BB_numberDotSeparator(_lastTotalCost / _seekedQuantity, 1000)}<sup>đ</sup> \
            <s>${BB_numberDotSeparator(bb_productData.product.price, 1000)}<sup>đ</sup></s>`;
        bb_billTotalCost.innerHTML = `${BB_numberDotSeparator(_calculated, 1000)}<sup>đ</sup>`;
        bb_billPromoCost.querySelector('label').innerHTML = `Giảm giá ${((_promoCost * 100) / _calculated).toFixed(1)}%`;
        bb_billPromoCost.querySelector('span').innerHTML = `-${BB_numberDotSeparator(_promoCost, 1000)}<sup>đ</sup>`;
        bb_billShipCost.innerHTML = `${BB_numberDotSeparator(_shipCost ? _shipCost : -bb_productData.shipping.baseShipCost, 1000)}<sup>đ</sup>`;
        bb_billLastTotalCost.innerHTML = `${BB_numberDotSeparator(_lastTotalCost + _shipCost, 1000)}<sup>đ</sup>`;

        bb_orderRecord.quantity = _seekedQuantity;
        bb_orderRecord.sumTotal = _lastTotalCost + _shipCost;
        bb_orderRecord.shipCost = _shipCost;
    }


    function BB_itemQuantityMatcher(_firstQuantity){
        let bb_quantityCounter = parseInt(_firstQuantity, 10);
        if(!bb_quantityCounter) return;
        BB_priceEstimator(bb_quantityCounter);

        bb_productQuantityArea.querySelector('button:nth-last-child(1)').addEventListener('click', (event) => {
            event.preventDefault();
            bb_quantityCounter++;
            BB_priceEstimator(bb_quantityCounter);
        });

        bb_productQuantityArea.querySelector('button:nth-child(1)').addEventListener('click', (event) => {
            event.preventDefault();
            if(bb_quantityCounter > 1){
                bb_quantityCounter--;
                BB_priceEstimator(bb_quantityCounter);
            }
        });

        bb_billQuantity.addEventListener('input', (event) => {
            event.preventDefault();
            bb_billQuantity.value = bb_billQuantity.value.replace(/\D+/g, '');
            if(!bb_billQuantity.value || bb_billQuantity.value < 1) return;
            BB_priceEstimator(bb_billQuantity.value);
        });
    }
}
BB_modalOderAndContactForm();


///////////////////////////////////////////////


// Thêm dấu chắm phân chia hàng nghìn và làm tròn số tới 1000
function BB_numberDotSeparator(_number, _round){
    if(Number.isInteger(_round) && _round > 0) _number = Math.round(_number / _round) * _round;
    return _number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function bb_csvStringEscaper(_string) {
    const bb_regex = /,|'|"/g;
    return `${_string.replace(bb_regex, (_match, _index) => {
        return _match.replace(',', '\,').replace('"', '""').replace("'", '\'');
    })}`
}



/*=============================================
  =           HÀM CỦA LANDING PAGE           =
=============================================*/


function BB_landingPageContactInfoAdder(){
    const bb_marketPlace = document.querySelector('.footer-marketplace-wrap');
    const bb_contactArea = document.querySelector('.footer-contact-wrap');
    if(!bb_marketPlace || !bb_contactArea) return;

    const bb_onlineStore = bb_marketPlace.querySelector('.online');
    const bb_offlineStore = bb_marketPlace.querySelector('.offline');
    const bb_sellerAddress = bb_marketPlace.querySelector('.address');
    const bb_sellerPhone = bb_contactArea.querySelector('.phone');
    const bb_sellerZalo = bb_contactArea.querySelector('.zalo');
    const bb_sellerEmail = bb_contactArea.querySelector('.mail');
    const bb_sellerWebsite = bb_contactArea.querySelector('.website');

    [bb_onlineStore, bb_offlineStore, bb_sellerPhone, bb_sellerZalo, bb_sellerEmail, bb_sellerWebsite].forEach((item, index) => {
        item.addEventListener('click', function (event){
            event.preventDefault();
            if(index === 0) window.open(bb_sellerData.store.onlineUrl);
            if(index === 1) window.open(bb_sellerData.store.onlineUrl);
            if(index === 2) window.open('tel:' + bb_sellerData.phone);
            if(index === 3) window.open(bb_sellerData.zalo.url01 + bb_sellerData.phone);
            if(index === 4) window.open('mailto:' + bb_sellerData.email);
            if(index === 5) window.open(bb_sellerData.website);
        });
    });

    let bb_tempNode = document.createElement('style');
    bb_tempNode.textContent = `.footer-about .footer-text p:after {content: "${bb_sellerData.address}";}
        .footer-marketplace-wrap .online::after {content: "Shopee";} \
        .footer-marketplace-wrap .offline::after {content: "Showroom"} \
        .footer-marketplace-wrap .address::after {content: "${bb_sellerData.address}";} \
        .footer-contact-wrap .phone::after {content: "0${BB_numberDotSeparator(bb_sellerData.phone.substring(1), 0)}";} \
        .footer-contact-wrap .zalo::after {content: "Zalo hotline";} \
        .footer-contact-wrap .mail::after {content: "${bb_sellerData.email}";} \
        .footer-contact-wrap .website::after {content: "${bb_sellerData.website}"} \
        .footer-contact-wrap .website, .footer-marketplace-wrap .address {display: none}`;
    bb_sellerAddress.before(bb_tempNode);
}


function BB_landingPageActionButton(){
    const bb_actionButtons = document.querySelector('#bb-action-group');
    if(!bb_actionButtons) return;

    let bb_tempNode = document.createElement('style');
    let bb_tempContent = `#bb-action-group { color: var(--color2); position: fixed; bottom: 30px; right: 30px; z-index: 99;} \
    .bb-action-button {background-color: #797EF6; position: absolute; width: 60px; height: 60px; cursor: pointer; bottom: 0; right: 0; border-radius: 10px;} \
    .bb-action-button i {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 25px;} \
    .bb-action-button span, .bb-buying-button {visibility: hidden;} \
    .bb-popup-menu {display: none; position: absolute; text-align: center; bottom: 80px; right: 0px;} \
    .bb-popup-menu span { display: block; width: 200px; padding: 20px; border-radius: 10px; margin: 20px auto 0;} \
    .bb-popup-menu span:hover {cursor: pointer; transform: scale(1.05);} \
    .bb-popup-menu span:nth-child(1) {background-color: #FE676E;} \
    .bb-popup-menu span:nth-child(2) {background-color: #1AA7EC;} \
    .bb-popup-menu span:nth-child(3) {background-color: #438BD3;} \
    .bb-popup-menu i {font-size:18px; padding-right: 10px;} \
    .bb-hiden { display: block; } \
    .bb-popup-menu.bb-hiden::before {content: ""; position: fixed; top: 0; left: 0; bottom: 0; right: 0; z-index: -1; background-color: rgba(0, 0, 0, .4);} \
    @media (max-width: 599px) { \
        /* #bb-action-group {bottom: 15px; right: 15px;} */ \
        #bb-action-group {bottom: 0px; right: 0px; width: 100%; background-color: var(--color2); font-weight: 700;} \
        .bb-action-button, .bb-buying-button {width: 50%; height: initial; border-radius: 0; text-align: center; padding: 25px 10px; line-height: 1; font-size: var(--fontSize); text-transform: uppercase;} \
        .bb-buying-button {background-color: #1AA7EC;} \
        .bb-action-button {background-color: #797EF6;} \
        .bb-popup-menu {right: 0; left: 0;} \
        .bb-action-button span, .bb-buying-button {visibility: visible;} \
        .bb-action-button i {display: none; } \
        .footer-top-wrap {padding: 196px 0 90px !important;}
    }`;
    const bb_textContent = ['Gọi điện thoại', 'Nhắn / gọi zalo', 'Gọi messenger'];
    [bb_actionButtons.querySelector('.bb-action-button'), ...bb_actionButtons.querySelectorAll('.bb-popup-menu span')].forEach((element, index) => {
        if(index > 0){
            bb_tempContent += `.bb-popup-menu span:nth-child(${index}):after {content: "${bb_textContent[index - 1]}"}`;
        }
        element.addEventListener('click', (event) => {
            event.preventDefault();
            bb_actionButtons.querySelector('.bb-popup-menu').classList.toggle('bb-hiden');
            if(index === 1) window.open('tel:' + bb_sellerData.phone);
            if(index === 2) window.open(bb_sellerData.zalo.url01 + bb_sellerData.phone);
            if(index === 3) window.open(bb_sellerData.messenger.url01);
        });
    });
    bb_tempNode.textContent = bb_tempContent;
    bb_actionButtons.before(bb_tempNode);
}


function BB_landingPageComboPrice(){
    const bb_combosArea = document.querySelector('#pricing');
    if(!bb_combosArea) return;

    const bb_infoOptions = Object.values(bb_productData.options);

    [bb_combosArea.querySelector('.regular'), bb_combosArea.querySelector('.popular-plan'),
    bb_combosArea.querySelector('.best-value-plan')].forEach((element, index) => {
        const bb_comboPrice = bb_productData.product.price * (100 - bb_infoOptions[index + 1].percent) / 100;
        element.querySelector('.price').innerHTML = `${BB_numberDotSeparator(bb_comboPrice, 1000)}`;
        element.querySelector('.total').innerHTML = `(Tổng ${BB_numberDotSeparator(
            bb_comboPrice * bb_infoOptions[index + 1].quantity, 1000
        )})`;
        element.querySelector('.save').innerHTML = `Mã giảm ${BB_numberDotSeparator(bb_infoOptions[index + 1].percent, 1)}%`;
        element.dataset.bbOrderstart = bb_infoOptions[index + 1].quantity;
    });

    const bb_paroller = document.querySelector('#paroller');
    bb_paroller.querySelectorAll('.price').forEach((element, index) => {
        element.innerHTML = `${BB_numberDotSeparator(bb_productData.product.price * (100 - bb_infoOptions[index + 1].percent) / 100, 1000)} \
        <span class="old-price">${BB_numberDotSeparator(bb_productData.product.price, 1000)}</span>`;
    });

}


// Hiện mức giá từng combo lên trang chủ (landing page)
function BB_landingPageAdditionDisplayer(){
    BB_landingPageContactInfoAdder();
    if(bb_productData.options.active) BB_landingPageComboPrice();
    BB_landingPageActionButton();
}



/*=============================================
  =            HÀM CỦA BIO PAGE            =
=============================================*/


function BB_bioLinksPageDisplayer(){
    if(!document.querySelector('#bio-links-page')) return;

    document.querySelectorAll('.bb-contact-url').forEach((element, index) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            if(index === 0) window.open(bb_sellerData.zalo.url01 + bb_sellerData.phone);
            if(index === 1) window.open(bb_sellerData.messenger.url01);
        });
    });

    document.querySelectorAll('#links span').forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            element.querySelector('#bb-host-shopee').window.open(bb_sellerData.shopee.url01);
            element.querySelector('#bb-host-lazada').window.open(bb_sellerData.lazada.url01);
            element.querySelector('#bb-host-tiktok').window.open(bb_sellerData.tiktok.url01);
            element.querySelector('#bb-host-shopee').window.open(bb_sellerData.shopee.url01);
            element.querySelector('#bb-host-facebook').window.open(bb_sellerData.facebook.url01);
            element.querySelector('#bb-host-youtube').window.open(bb_sellerData.youtube.url01);
        })
    })
}
BB_bioLinksPageDisplayer();



/*=============================================
  =            HÀM CỦA BIO PAGE            =
=============================================*/


function BB_facebookPixelController(){
    return {
        fbpixel: function(){
            const bb_tempNode = '\
            <script>\
            !function(f,b,e,v,n,t,s)\
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};\
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\';\
            n.queue=[];t=b.createElement(e);t.async=!0;\
            t.src=v;s=b.getElementsByTagName(e)[0];\
            s.parentNode.insertBefore(t,s)}(window, document,\'script\',\
            \'https://connect.facebook.net/en_US/fbevents.js\');\
            fbq(\'init\', \'479254314985143\');\
            fbq(\'track\', \'PageView\');\
            </script>\
            <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=479254314985143%26ev=PageView%26noscript=1"/></noscript>';
            document.head.innerHTML += bb_tempNode;
        },
        fbtrack: function(bb_param){
            fbq('track', 'Purchase', {content_name: bb_param.shortName, num_items: bb_param.quantity, value: bb_param.sumTotal, currency: 'VND'});
        }
    }
}

}
BB_preciousStone();
