/* ==================== */
/* ------FE07--BA------- */
/* ==================== */
var urunDuzeniTipi = 0;
var mobilBlokCozunurluk = 768;
var sliderZoomCozunurluk = 768;
var isHoverCartProduct = false;
var kategoriMenuAcikGetir = true;
var urunDetayZoomCozunurluk = 1025;
var windowidth = document.documentElement.clientWidth;
var urunDetay_varyasyonSecili = true;
var sepeteEkleUyariAktif = true;
var menuyukseklik;
var sliderItems = 0;
var fixControl;

//ürün list pagespeed preload
if ($('.ItemOrj').length > 0) {
    const items = document.querySelectorAll('.ItemOrj .productImage a img');
    for (let i = 0; i < Math.min(items.length, 4); i++) {
        const imgSrc = items[i].getAttribute('data-original') || items[i].getAttribute('src');
        if (imgSrc) {
            items[i].setAttribute('src', imgSrc);
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = imgSrc;
            document.head.appendChild(link);
        }
    }
}


$(document).ready(function () {
    if ($('.cariOdemeContainer').length > 0) {
        $('.navigation .navUl').wrapAll('<div></div>');
    }
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    if ($('#divSayfalamaUst').length > 0) { KategoriIslemleri(); }
    else if (globalModel.pageType == 'productdetail') { UrunDetayIslemleri(); }
    else if (globalModel.pageType == 'cart' || globalModel.pageType == 'ordercomplete' || globalModel.pageType == 'payment' || globalModel.pageType == 'ordercompleted') { SepetEkrani(); }
    if ($('.pageContainer').length > 0) { $('body').addClass('SayfaIcerik'); }
    if ($('.magazalarContent').length > 0) { $('body').addClass('Magazalar'); }
    if ($('.userDivRow').length > 0) { $('body').addClass('UyeGiris'); }
    if ($('.uyeOlContainer').length > 0) { $('body').addClass('UyeOl'); }
    if ($('.homeHeader').length > 0) { $('body').addClass('HomeBody'); }

    GlobalIslemler();
    console.log(globalModel.member);

    menuyukseklik = $('.navigation').height();
    if (menuyukseklik > 80 || windowidth < 1042) {
        $("#logo").appendTo(".centerDiv");
        $("body").addClass("MobilMenuAc");
    } else {
        $("#logo").appendTo(".leftDiv");
        $("body").removeClass("MobilMenuAc");
    }
});

function HeaderYapiKontrol() {
    if (windowidth >= 768) {
        if ($('.logoArea').length == 0) {
            $('#logo').before('<div class="logoArea"><div class="leftDiv"></div><div class="centerDiv"></div><div class="rightDiv"></div></div>');

            $('.mobilMenuAcButton').prependTo('.logoArea .leftDiv');
            $('.navigation').appendTo('.logoArea .centerDiv');
            $(".SearchToggle").appendTo('.logoArea .rightDiv');
            $(".HeaderFavori").appendTo('.logoArea .rightDiv');
            $('.welcome').appendTo('.logoArea .rightDiv');
            $('.mycart').appendTo('.logoArea .rightDiv');
            $('.CartProduct').appendTo('.mycart');
            $('.searchContent').appendTo('.headerContent');
            $('.mycart > a').attr('href', '/sepetim.aspx');
        }
        if (windowidth < 1042) {
            $('#lang_flag_container').appendTo('.logoArea .leftDiv');
        } else {
            $('#lang_flag_container').appendTo('.logoArea .rightDiv');
        }
    } else {
        $('#logo').appendTo('.headerContent');
        $('.navigation').appendTo('.headerContent');
        $('.SearchToggle').appendTo('.headerContent');
        $('.HeaderFavori').appendTo('.headerContent');
        $('.welcome').appendTo('.headerContent');
        $('.mobilMenuAcButton').appendTo('.headerContent');
        $('.CartProduct').insertAfter('.mobilMenu');
        $('.mycart').appendTo('.mycartClick');
        $('.welcome').insertAfter('.headerContent');
        $('.searchContent').insertAfter('.headerContent');
        $(".logoArea").remove();
        $('#hb-logo').insertBefore('#divTopProductSearch');
        $('.newHeaderNavigation').addClass('mobileStyle');
        setTimeout(() => {
            if ($('.newHeaderNavigation.mobileStyle .newHeaderNav').find('.mobile-nav-bottom').length == 0) {
                $('.newHeaderNavigation.mobileStyle .newHeaderNav').append(`
                    <div class="mobile-nav-bottom">
                        <ul class="nav-bottom-list">
                   
                         <li class="">
                            <a href="/2-el" class="d-block fw-medium text-gray menu-item"
                            >2.El</a
                            >
                        </li>

                        <li class="">
                            <a
                            href="/siparis-takip.aspx"
                            >Sipariş Takibi</a
                            >
                        </li>
                        <li class="">
                            <a
                            href="/hakkimizda"
                            >Hakkımızda</a
                            >
                        </li>
                       
                        <li class="">
                            <a
                            href="/iletisim.aspx"
                            >İletişim</a
                            >
                        </li>
                        </ul>
                        <div class="nav-copyright">
                            © 2025 AsafGastro. Tüm hakları saklıdır.
                        </div>
                    </div>
                    `);
            }
            mobilMenuTop();
        }, 100);
    }
}
function mobilMenuTop() {
    if ($('#dynamicTop').length || window.innerWidth >= 1040) return;
    var html = ``;
    if (globalModel.member.memberId == 0) {
        html += `
            <div id="dynamicTop">
                <div class="dynamicTopHeader">
                    Hoşgeldiniz
                </div>
                <div class="dynamicTopContent">
                    <a href="/UyeGiris">Giriş Yap</a>
                    <span> / </span>
                    <a href="/UyeGiris">Kayıt Ol</a>
                </div>
            </div>
        `;
    } else {
        html += `
            <div id="dynamicTop">
                <div class="dynamicTopHeader">
                    Hoşgeldiniz
                </div>
                <div class="dynamicTopContent">
                    ${globalModel.member.memberName}
                </div>
            </div>
        `;
    }
    $(html).insertAfter('.newHeaderNav .newMenuTop');
}
mobileMenu();
$('.mycart').insertBefore('.welcome');
$('.headerContent').prepend('<div class="SearchToggle svgIcon"><svg width="24" viewBox="0 0 488.4 488.4"> <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"/> </svg></div>');
$('.welcome').before('<a href="/Hesabim.aspx#/Favorilerim" class="HeaderFavori"><svg width="22" viewBox="0 0 471.701 471.701" fill="#ffffff"> <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"/> </svg><span></span></a>');
function GlobalIslemler() {

    $('[title]').removeAttr('title');
    $('.CategoryBody .katSliderBlock').prependTo('#divIcerik');


    if (windowidth > 1099) {



        $('body').on('mouseenter', '.MenuCenter > div > div.katbtn', function () {
            $('#headerNew .header .newHeaderNavigation:not(.mobileStyle)').addClass('active');
            $(this).addClass('active');
            $('#divIcerik').addClass('hoverr');
        });

        $('body').on('mouseleave', '#headerNew .header .newHeaderNavigation', function () {
            $(this).removeClass('active');
            $('#divIcerik').removeClass('hoverr');
        });
    }

    if ($("#headerNew .header .newHeaderNavigation:not(.mobileStyle) .newHeaderNavUl > li > a .upTagText img").length == 0) {
        $("#headerNew .header .newHeaderNavigation:not(.mobileStyle) .newHeaderNavUl > li").each(function () {
            var imgyolu = $(this).find(" > a > .upTagText > span").html();
            $(this).find(" > a > .upTagText > span").text('');
            $(this).find(" > a > .upTagText > span").prepend('<img src="/uploads/editoruploads/img/' + imgyolu + '"/>');
        });

    }



    if (!pageInitialized) {
        // setTimeout(() => {if($('#divChromeBildirim').length > 0){$('.insider-opt-in-notification').addClass('active');};},8000);
        if (windowidth > 359 && windowidth < 769) {
            // bottomHead(); 
        }
        HeaderYapiKontrol();
        if (windowidth > 1041) {
            $('#instaStories').prependTo('.logoArea .rightDiv');
        } else {
            $('#instaStories').insertAfter('.SearchToggle');
        }
        FavoriIslemCallback();
        $('.UFavorilerimeEkle a,.favori a').on('click', function (event) {
            FavoriIslemCallback();
        });
        $("body").on("click", ".SearchToggle", function () {
            $('.searchContent').addClass('active');
            $('#divIcerik').addClass('hoverr');
        });
        $("body").on("click", function (evt) {
            if (!$(evt.target).is('.SearchToggle,.SearchToggle *,.searchContent,.searchContent *')) {
                $('.searchContent').removeClass('active');
                $('.SearchToggle').removeClass('active');
                $('#divIcerik').removeClass('hoverr');
            }
        });
    }

    sayfaTasarim();

    if (windowidth > 768) {
        $('.navigation .navUl > li.ulVar').each(function () {
            $(this).find('> ul').wrapAll('<div class="Flexscroll"></div>');
        });
    }
    $('.mobilMenuAcButton').prependTo('.logoArea .leftDiv');
    if ($('ul.breadcrumb').length > 0) {
        var breadHtml = $('ul.breadcrumb').html();
        $('ul.breadcrumb').after('<div class="breadList" style="display:none;"><div class="mBread"><ul class="breadcrumbList">' + breadHtml + '</ul></div><div class="clbtn"><i class="fa fa-times"></i></div></div>');
        var liS = $(".breadcrumbList li");
        $(".breadcrumbList li").each(function (index) { if (index > 0) { var ul = $("<ul/>"); $(this).appendTo(ul); ul.appendTo(liS[index - 1]); } });
        $('.breadcrumb').on('click', function () { $('.breadList').addClass('breadActive').show(); $(this).addClass('zindex'); });
        $('.clbtn').on('click', function () { $('.breadList').removeClass('breadActive').hide(); $('.breadcrumb').removeClass('zindex'); });
    }
}

function KategoriIslemleri() {
    $("body").addClass("CategoryBody");
    if (windowidth >= 768) {
        $('.categoryTitle .categoryTitleText').insertBefore('.ticiTopBlockContent');
        if ($('.YG-menu-container').length > 0) {
            $('.YG-menu-container').prependTo('#ProductListMainContainer');
        }
    } else {
        $('.mobilFilterBtn').append('<div class="filterWarning"><span>Alt kategorilere buradan ulaşabilirsiniz.</span><i class="fal fa-times closeFilterWarning"></i></div>');
        if ($('.YG-menu-container').length > 0) {
            $('.YG-menu-container').insertBefore('#divSayfalamaUst');
        }
    }
    $('.categoryTitleText').prepend('<div class="KategoriAdi">' + productsModel.pageName + '</div>');
    setTimeout(function () {
        $(".categorydesign img").length > 0 ? $(".categorydesign").css("max-height", $(".categorydesign img").height() + 100) : "";
    }, 500);
    if ($(".ticiTopBlockContent .categorydesign").length > 0) {
        $(".ticiTopBlockContent .categorydesign").wrapAll('<div class="ticiContainer Full"></div>');
    }
    $('.closeFilterWarning').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.filterWarning').remove();
    });

    setTimeout(function () { $('.katSliderBlock ul').owlCarousel({ autoplay: false, loop: false, rewind: true, lazyLoad: true, navClass: ['ProductListprev', 'ProductListnext'], margin: 20, nav: false, responsive: { 0: { items: 3, margin: 10 }, 768: { items: 5 }, 1025: { items: 6 }, 1160: { items: 9 } }, onInitialized: function callback() { if (typeof lazyLoad === "function") { lazyLoad(); } } }); }, 300);

    $(function () {
        setTimeout(function () {
            $('.YG-menu-container .owl-carousel').owlCarousel({
                autoplay: false,
                loop: false,
                rewind: true,
                lazyLoad: true,
                nav: true,
                navClass: ['ProductListprev', 'ProductListnext'],
                margin: 10,
                autoWidth: true,
                items: 2,
                responsive: {
                    0: {
                        items: 2,
                        margin: 8
                    },
                    480: {
                        items: 3,
                        margin: 8
                    },
                    // Küçük tablet
                    768: {
                        items: 4,
                        margin: 10
                    },
                    // Tablet
                    1024: {
                        items: 6,
                        margin: 10
                    }
                }
            });
        }, 500); // 0.5 saniye gecikme
    });

}
function UrunDetayIslemleri() {
    $("body").addClass("ProductBody");
    if (productDetailModel.totalStockAmount < 1) { $('.RightDetail').addClass('StokYok'); }
    if (!pageInitialized) {
        $('.ProductDetailMain').prepend('<div class="TopDet"></div>');
        // $('.ProductDetail > .categoryTitle').insertBefore('#divIcerik');
        $('.leftImage').appendTo('.TopDet');
        $('.RightDetail').appendTo('.TopDet');

        $('.RightDetail').prepend('<div class="TopList"></div>');
        $('.PriceList').prependTo('.TopList');
        $('.ProductName').prependTo('.TopList');

        $('.TopList').after('<div class="MiddleList"></div>');
        $('#divUrunDetayDinamikForm').parent().appendTo('.MiddleList');
        $('#divUrunKisiselNot').appendTo('.MiddleList');
        $('#divUrunSiparisDosya').appendTo('.MiddleList');
        $('#divSatinAl').appendTo('.MiddleList');
        $('#divUrunEkSecenek').prependTo('.MiddleList');

        $('.MiddleList').after('<div class="BottomList"></div>');
        $('.ProductIcon').appendTo('.BottomList');
        $('.ProductIcon2 ').appendTo('.BottomList');
        $('#divEkstraBilgiler').appendTo('.BottomList');
        $('.product_social_icon_wrapper').appendTo('.BottomList');
        $(".buyfast").length == 0 ? $(".basketBtn").addClass("buyfastyok") : "";
        $('.middleBottomBlock .OzelBlokIcerik').insertBefore('#divUrunOzellikAlani')
        $('.BasketBtn').append($('.UFavorilerimeEkle'));
        if ($('#divBenzerUrunStokOlmayan').length) {
            const hedef = $('#divUrunOzellikAlani');
            $('#divBenzerUrunStokOlmayan').detach().appendTo(hedef);
        }
        if (windowidth >= 768) {
            if ($(".GalleryArea").length > 0) {
                $('.TopDet .productTimer').prependTo('.GalleryArea');
                $('.markaresmi').appendTo('.ProductName');
            } else if ($("#divMobileImageList.owl-carousel").length > 0) {
                $('.markaresmi').appendTo('.ProductName');
                $('.TopDet .productTimer').prependTo('#divMobileImageList');
            }
            else if (productDetailModel.videoSettings.videoLink.length > 0) {
                $('.TopDet .productTimer').prependTo('#divVideoGoruntulemeAlan');
                $('.markaresmi').appendTo('.ProductName');
            } else {
                $('.productTimer').prependTo('.Images');
            }
        } else {
            $('.TopDet .productTimer').insertBefore('.leftImage');
            if ($(".GalleryArea").length > 0) {
                $('.markaresmi').appendTo('.ProductName');
            } else {
                $('.markaresmi').appendTo('.ProductName');
            }
        }
        $(".RightDetail #divKDVDahilFiyat").length > 0 ? $(".urunDetayFiyatContainer").addClass("griuygula") : "";
        $('#divMarka').insertBefore('.ProductName');
        $('#divOnyazi').insertAfter('.ProductName');
        $('#divMagazaStok').insertAfter('.ProductName');
        $('#divTahminiTeslimatSuresi').insertAfter('.ProductName');
        $('#divIndirimOrani').insertBefore('#pnlFiyatlar');
        $('#divParaPuan').insertAfter('.ProductName');
        $('#divToplamStokAdedi').insertAfter('.ProductName');
        $('#divUrunStokAdedi').insertAfter('.ProductName');
        $('#divTedarikci').insertAfter('.ProductName');
        $('#divBarkod').insertAfter('.ProductName');
        $('.puanVer').insertAfter('.ProductName');
        $('#divUrunKodu').insertAfter('.ProductName');

        $('.RightDetail .riSingle .riUp').html('<i class="far fa-plus"></i>');
        $('.RightDetail .riSingle .riDown').html('<i class="far fa-minus"></i>');
        $('#divKombinSatinAl').prependTo('.BottomList');
        $('#divKombinSatinAl').insertAfter('.basketBtn');
        $('.buyfast').insertAfter('.basketBtn');
        $('#divAdetCombo').insertBefore('.basketBtn');
        $('#divTaksitAciklama').appendTo('.PriceList');
        $('#divAdetCombo .left_line').insertBefore('#divAdetCombo');
        $('.pSatisBirimi').insertBefore('.Basketinp');

        $('#divOzelAlan1,#divOzelAlan2,#divOzelAlan3,#divOzelAlan4,#divOzelAlan5').wrapAll('<div class="DetayOzelAlanWrap"></div>').find("img").closest("#divOzelAlan1,#divOzelAlan2,#divOzelAlan3,#divOzelAlan4,#divOzelAlan5").addClass("resimli");
        $('.DetayOzelAlanWrap').insertAfter('#divSatinAl');
        $('#divStokYok').prependTo('.MiddleList');
        formatHavaleIndirim(5);
    }
    $(".basketBtn,.UFavorilerimeEkle a,.UIstekListemeEkle a").on('click', function () { if ($("#hddnUrunID").val() == "0") { $('html,body').animate({ scrollTop: $('#divUrunEkSecenek').offset().top - 110 }, 'slow') } });
}
function formatHavaleIndirim(indirimOrani) {
    const text = `Bu ürünü havale ile ekstra %${indirimOrani} indirim ile ${$('#ltrHavaleFiyati').text()}₺'ye satın alabilirsiniz.`;
    $('#divOzelAlan1').html(text);
}
function topMenuCallback() {
    if ($('.homeHeader').length > 0) { $('body').addClass('homeBody'); }
    HeaderFixed();
    //bottomHead();

    $(".navUl li").each(function () { if ($(this).find("ul").length > 0) { $(this).addClass("ulVar"); } });
    if (!pageInitialized) {
        $('.navUl > li.ulVar, .yanResimliMenu .resimliYanMenu .lfMenu .lfMenuUl .lfMenuitem.ulVar').mouseenter(function () {
            $('#divIcerik').addClass('hoverr');
        });
        $('.navUl > li.ulVar, .yanResimliMenu .resimliYanMenu .lfMenu .lfMenuUl .lfMenuitem.ulVar').mouseleave(function () {
            $('#divIcerik').removeClass('hoverr');
        });
        $('.navigation .navUl > li.ulVar').each(function () { if ($(this).find('.altMenuSag').length > 0) { $(this).find('.altMenu').addClass('picTrue'); } });
    }


}
function blockCompleteCallback() {

    $('.Blog-List > ul').each(function () {
        if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel"))
            $(this).owlCarousel({
                autoplay: false,
                loop: false,
                rewind: true,
                lazyLoad: true,
                navClass: ['ProductListprev', 'ProductListnext'],
                margin: 20,
                nav: true,
                responsive: { 0: { items: 2, margin: 10 }, 768: { items: 3 }, 1025: { items: 3 }, 1160: { items: 3 } }
            });
    });
    if (globalModel.pageType == 'homepage') {

    }
    if ($('#divSayfalamaUst').length > 0) {
    }
    if (globalModel.pageType == 'productdetail') {
        UrunDetayPaylas();
        if (!pageInitialized) {
            $('#linkOncekiSayfa').appendTo('ul.breadcrumb');
            if (windowidth < 768) {
                $('#linkOncekiSayfa').appendTo('.leftImage');
            }
        }

        if (windowidth < 768) {
            var cList = $('.urunTab ul li'); var cDiv = $('.urunDetayPanel'); for (var i = 0; i <= cList.length; i++) { for (var i = 0; i <= cDiv.length; i++) { $(cDiv[i]).appendTo(cList[i]); } } $(".urunDetayPanel").hide();
            $(".urunOzellik").removeAttr('class').addClass("urunOzellikTab");
            $('.urunOzellikTab .urunTab >ul>li>a').on('click', function () {
                var openTab = $(this);
                if ($(this).parent().hasClass('active')) { $('.urunOzellikTab .urunTab >ul>li>a').parent().removeClass('active'); }
                else { $('.urunOzellikTab .urunTab >ul>li>a').parent().removeClass('active'); $(this).parent().addClass('active'); }
                var tabName = openTab.attr('data-tab') || ""; if (tabName === "Commets") { TabGetComments(); } else if (tabName === "recommendations") { TabGetRecommendations(); }
            });
        }
    }
}
function urunListCallback() {
    if (globalBlokModel == 1) {
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.leftBlock').removeClass().addClass('leftBlock LeftMiddle'); $('.centerCount').removeClass().addClass('centerCount LeftMiddle');
    }
    else if (globalBlokModel == 2) {
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.leftBlock').removeClass().addClass("leftBlock LeftMiddleRight"); $('.rightBlock').removeClass().addClass("rightBlock LeftMiddleRight"); $('.centerCount').removeClass().addClass("centerCount LeftMiddleRight");
    }
    else if (globalBlokModel == 3) {
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.rightBlock').removeClass().addClass("rightBlock MiddleRight"); $('.centerCount').removeClass().addClass("centerCount MiddleRight");
    }
    else if (globalBlokModel == 4) {
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.centerCount').removeClass().addClass("centerCount Middle");
    }
    $('.leftBlock .jCarouselLite ul').each(function () { if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) $(this).owlCarousel({ rewind: true, margin: 10, nav: false, lazyLoad: true, responsive: { 0: { items: 1 }, }, onInitialized: function callback() { lazyLoad(); } }); });
    $('.rightBlock .jCarouselLite ul').each(function () { if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) $(this).owlCarousel({ rewind: true, margin: 10, nav: false, lazyLoad: true, responsive: { 0: { items: 1 }, }, onInitialized: function callback() { lazyLoad(); } }); });
    if ($('.blockSelect').length > 0) {
        $('body').on('click', '.blockSelect .sort_hrz', function () { urunDuzeniTipi = 1; urunDuzeni(urunDuzeniTipi); }); $('body').on('click', '.blockSelect .sort_2', function () { urunDuzeniTipi = 2; urunDuzeni(urunDuzeniTipi); }); $('body').on('click', '.blockSelect .sort_3', function () { urunDuzeniTipi = 3; urunDuzeni(urunDuzeniTipi); }); $('body').on('click', '.blockSelect .sort_4', function () { urunDuzeniTipi = 4; urunDuzeni(urunDuzeniTipi); }); $('body').on('click', '.blockSelect .sort_5', function () { urunDuzeniTipi = 5; urunDuzeni(urunDuzeniTipi); });
    }
    if ($('.leftBlock .sliderBannerContainer,.rightBlock .sliderBannerContainer').length > 0) { $('.leftBlock .sliderBannerContainer,.rightBlock .sliderBannerContainer').addClass('leftRightSlide'); }
    $('.sliderBannerContainer:not(.NoSlider,.leftRightSlide) .jCarouselLite ul').each(function () {
        if ($(this).closest(".leftBlock").length > 0) {
            sliderItems = 1;
        } else if (windowidth >= 768 && windowidth < 1025) {
            sliderItems = 3;
        }
        else if (windowidth >= 1025) {
            sliderItems = 4;
        }
        if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel"))
            $(this).owlCarousel({
                autoplay: false,
                loop: false,
                rewind: true,
                lazyLoad: true,
                navClass: ['ProductListprev', 'ProductListnext'],
                margin: 20,
                nav: true,
                responsive: { 0: { items: 2, margin: 10 }, 768: { items: 3 }, 1025: { items: sliderItems }, 1160: { items: sliderItems } }
            });
    });
    urunDuzeni(urunDuzeniTipi);
    if (globalModel.pageType == 'homepage') {
    }
    if ($('#divSayfalamaUst').length > 0) {
    }
    if (globalModel.pageType == 'productdetail') {
        if ($('#divSatinAl').css('display') == 'none') { $('.RightDetail').addClass('StokYok'); }
        $('.centerCount .ProductDetailMainRow .detaySliderContainer .jCarouselLite ul').each(function () {
            if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel"))
                $(this).owlCarousel({
                    autoplay: false,
                    loop: false,
                    rewind: true,
                    lazyLoad: true,
                    navClass: ['ProductListprev', 'ProductListnext'],
                    margin: 20,
                    nav: true,
                    responsive: { 0: { items: 2, margin: 10 }, 768: { items: 3 }, 1025: { items: 3 }, 1160: { items: 4 } }
                });
        });
        if (windowidth > 992) {
            $('.SmallImages').find('div').eq(0).addClass('active');
            $('.SmallImages div img').on('click', function (event) {
                $('.SmallImages div').removeClass('active');
                $(this).parent().addClass('active');
            });
        }
    }
    InitTimers();
    $(window).on('scroll', function () {
        if ($('.jCarouselLite[data-lazy-function]').length > 0) { lazyLoad(); }
    });



    urunKartCallBack();
    $(".panel-search input").length > 0 ? $(".panel-search input").attr("placeholder", translateIt("BlokModul_UrunArama_Ara") + "...") : "";
    $(".FiyatTextBox .filterPrice1").length > 0 ? $(".FiyatTextBox .filterPrice1").attr("placeholder", translateIt("FiyatAlarmListem_IlkFiyat")) : "";
    $(".FiyatTextBox .filterPrice2").length > 0 ? $(".FiyatTextBox .filterPrice2").attr("placeholder", translateIt("FiyatAlarmListem_SonFiyat")) : "";

}
function urunDuzeni(tip) {
    if ($('#divSayfalamaUst').length > 0) {
        if ($('.blockSelect .sort_5').length == 0) { $('.blockSelect .sort_4').after('<a href="javascript:;" class="sort_5"><i class="fas fa-th"></i></a>'); }
        if ($('.blockSelect .sort_2').length == 0) { $('.blockSelect .sort_3').before('<a href="javascript:;" class="sort_2"><i class="fas fa-th-large"></i></a>'); }
        if ($('.brandlistselection select').length > 0) { $('#divSayfalamaUst').addClass('Slct'); }
        $('.sort_hrz').removeClass("Active");
        $('.sort_2').removeClass("Active");
        $('.sort_3').removeClass("Active");
        $('.sort_4').removeClass("Active");
        $('.sort_5').removeClass("Active");
        if (tip == 1) { $('.ProductListContent .ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_hrz'); $(".ItemOrj").removeClass().addClass("ItemOrj col-12"); $('.blockSelect .sort_hrz').addClass("Active"); lazyLoad(); }
        else if (tip == 2) { $('.ProductListContent .ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_2'); $(".ItemOrj").removeClass().addClass("ItemOrj col-6"); $('.blockSelect .sort_2').addClass("Active"); lazyLoad(); }
        else if (tip == 3) { $('.ProductListContent .ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_3'); $(".ItemOrj").removeClass().addClass("ItemOrj col-4"); $('.blockSelect .sort_3').addClass("Active"); lazyLoad(); }
        else if (tip == 4) { $('.ProductListContent .ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_4 asd'); $(".ItemOrj").removeClass().addClass("ItemOrj col-3"); $('.blockSelect .sort_4').addClass("Active"); lazyLoad(); }
        else if (tip == 5) { $('.ProductListContent .ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_5'); $(".ItemOrj").removeClass().addClass("ItemOrj col-5li"); $('.blockSelect .sort_5').addClass("Active"); lazyLoad(); }
        else if (tip == 6) { $('.ProductListContent .ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_6'); $(".ItemOrj").removeClass().addClass("ItemOrj col-2"); lazyLoad(); }


        if ($('.FiltreUst').length == 0) {
            $('body #divSayfalamaUst .category-vertical-filters.top-filters').prepend('<div class="tukgo"><a onclick="sortingClick(1000)" class="filterOrderInStock">' + translateIt("Urunler_Stoktakiler") + '</a></div>');
            $('body #divSayfalamaUst .category-vertical-filters.top-filters').prepend('<div class="FiltreUst"><div class="closeFilt"><i class="fa fa-times"></i></div><span>' + translateIt("UrunFiltreleme_Filtreleme") + '</span><a onclick="clearAllFilters()"><i class="fa fa-trash"></i></a></div>');
            if ($('.moreNum').length == 0) {
                $('#divSayfalamaUst .category-vertical-filters.top-filters .panel').find('.panel-heading').append('<div class="moreNum"></div>');
            }
            $('.mobilFilterBtn').on('click', function (event) {
                $('.mobilaf').addClass('acik');
                $('#divSayfalamaUst .filterBlock').addClass('active');
            });
            $('.closeFilt').on('click', function (event) {
                $('.mobilaf').removeClass('acik');
                $('#divSayfalamaUst .filterBlock').removeClass('active');
            });
        }
        $('#divSayfalamaUst .category-vertical-filters.top-filters .panel').each(function (index, el) {
            if ($(this).find('li').hasClass('selected')) { var numlen = $(this).find('li.selected').length; $(this).addClass('more'); $(this).find('.moreNum').html(numlen); }
            else { $(this).removeClass('more'); $(this).find('.moreNum').html(''); }
        });
        $('#divSayfalamaUst .category-vertical-filters.top-filters .panel').each(function (index, el) {
            if ($('#divSayfalamaUst .category-vertical-filters.top-filters .panel').hasClass('more')) { $('.FiltreUst a').addClass('active'); return false; }
            else { $('.FiltreUst a').removeClass('active'); }
        });
        if ($('.sortingContent .filterOrderInStock').hasClass('selected')) { $('.tukgo .filterOrderInStock').addClass('selected'); } else { $('.tukgo .filterOrderInStock').removeClass('selected'); }
        if ($('.sortingContent .sortingButton').length > 0) { if ($('.sortingContent .sortingButton > a[onclick="sortingClick(1000)"]').hasClass('selected')) { $('.tukgo .filterOrderInStock').addClass('selected'); } else { $('.tukgo .filterOrderInStock').removeClass('selected'); } }

    }
    if (globalModel.pageType == 'productdetail') { if ($('#divUrunKodu span').length == 0) { $('#divUrunKodu').prepend('<span>' + translateIt("Global_StokKodu") + '</span>'); } }
    $(".panel-search input").length > 0 ? $(".panel-search input").attr("placeholder", translateIt("BlokModul_UrunArama_Ara") + "...") : "";
    $(".FiyatTextBox .filterPrice1").length > 0 ? $(".FiyatTextBox .filterPrice1").attr("placeholder", translateIt("FiyatAlarmListem_IlkFiyat")) : "";
    $(".FiyatTextBox .filterPrice2").length > 0 ? $(".FiyatTextBox .filterPrice2").attr("placeholder", translateIt("FiyatAlarmListem_SonFiyat")) : "";

}
function ekSecenekListesiCallBack() {
    if (globalModel.pageType == 'productdetail') { if ($('#divUrunKodu span').length == 0) { $('#divUrunKodu').prepend('<span>' + translateIt("Global_StokKodu") + '</span>'); } }
}


function bottomHead() {
    if ($('.bottomHead').length == 0) {
        $('body').append('<div class="bottomHead"> <ul> <li class="homeC"> <a href="/"><i class="fa fa-home"></i><span>' + translateIt("GlobalMasterPage_Anasayfa") + '</span></a> </li> <li class="favoC"> <a href="javascript:void(0)" onclick="GirisKontrol(0)"><i class="fa fa-heart"></i><span>' + translateIt("Favorilerim_Baslik") + '</span><div class="favNum"></div></a> </li> <li class="cartC"> <a href="/sepetim.aspx"><i class="fa fa-shopping-cart"></i><span>' + translateIt("GlobalMasterPage_Sepetim") + '</span></a> </li> <li class="welcC"> <a href="javascript:void(0)" onclick="GirisKontrol(0)"><i class="fa fa-user"></i><span>' + translateIt("GlobalMasterPage_MobilUyeGirisi") + '</span></a> </li> </ul> </div>');
        if (siteSettings.isAuthenticated == true) { $('.welcC a').attr('href', '/hesabim.aspx'); $('.favoC a').attr('href', '/Hesabim.aspx/#/Favorilerim'); $('.welcC span').html(translateIt("GlobalMasterPage_MobilHesabim")); }
    }
}
function mobileMenu() {
    if (windowidth > 767) {
        $('#header,body').addClass('MoreMenu');
    }

    $('.headerContent').prepend('<div class="mobilMenuAcButton"><span>MENU</span><svg width="30px" height="60" viewBox="0 0 24 24" fill="none"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>');
    var menuKopya = $('.navigation').html();
    $('.mobilMenuAcButton').on('click', function (event) {
        if ($('.mobilMenu').length == 0) {

            $('body').prepend('<div class="mobilMenu"><div class="menuUstBolum"><div class="mobilMenuBT"><svg width="30px" height="60" viewBox="0 0 24 24" fill="none"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg><span>MENU</span></div><div class="CloseBtnMenu"><i class="far fa-times"></i></div></div><div class="menuIcerikAlan">' + menuKopya + '</div>');

            if ($('.HeaderMenu2').length > 0) {
                $('.mobilMenu .HeaderMenu2 > li > ul').closest('li').append('<div class="ResimsizDown"><i class="fa fa-angle-right"></i></div>');
                $('.mobilMenu .HeaderMenu2 > li > ul li ul').closest('li').append('<div class="ResimsizDown2"><i class="fa fa-angle-right"></i></div>');
                $('.ResimsizDown').on('click', function (event) { if ($(this).find('.fa').hasClass('fa-angle-right')) { $(this).closest('li').find('> ul').addClass('active'); } else { $(this).closest('li').find('> ul').removeClass('active'); } });
                $('.ResimsizDown2').on('click', function (event) { if ($(this).find('.fa').hasClass('fa-angle-right')) { $(this).closest('li').find('> ul').addClass('active'); $(this).closest('ul').addClass('over'); } else { $(this).closest('li').find('> ul').removeClass('active'); $(this).closest('ul').removeClass('over'); } });
                $('.ResimsizDown').each(function (index, el) { var Down1 = $(this).parent('li').find('>a').text(); $(this).closest('li').find('> ul').prepend('<span><div class="NoiBack"><i class="fa fa-long-arrow-left"></i></div> <span>' + Down1 + '</span></span>'); });
                $('.ResimsizDown2').each(function (index, el) { var Down2 = $(this).parent('li').find('>a').text(); $(this).closest('li').find('> ul').prepend('<span><div class="NoiBack2"><i class="fa fa-long-arrow-left"></i></div> <span>' + Down2 + '</span></span>'); });
                $('.NoiBack2').on('click', function (event) { $(this).parent().parent().removeClass('active'); $(this).closest('.over').removeClass('over'); $('.mobilMenu .navUl > li > ul').animate({ scrollTop: 0 }, 100); $('.menuIcerikAlan').animate({ scrollTop: 0 }, 100); });
                $('.NoiBack').on('click', function (event) { $('.mobilMenu .navUl > li > ul').removeClass('active'); $('.menuIcerikAlan').animate({ scrollTop: 0 }, 100); });
            }
        }

        setTimeout(function () {
            $('body').addClass('overflow transform'); $('.mobilMenu').addClass('acik');
        }, 25)

        $('.mobilaf').addClass('acik').removeAttr('style');; $('.CartProduct').removeClass('animated'); $('.welcome').removeClass('active'); $('.searchContent').removeClass('active'); $('.SearchToggle').removeClass('active'); $('#lang_flag_container').removeClass('selector'); $('.welcomeOpen').removeClass('active');
    });

    if (windowidth < 768) {
        $('#lang_flag_container').prependTo('body');
    }
    $('body').prepend('<div class="mobilaf"></div>');
    $('.headerContent').prepend('<div class="mycartClick svgIcon"><svg width="22px" viewBox="0 0 16 16" fill="#ffffff"> <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/> </svg></div>');
    if ($("#lang_flag_container").length > 0) {
        $('.headerContent').prepend('<div class="mobilLang svgIcon"><svg width="30px" viewBox="0 0 24 24" fill="none"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5109 6.61716C9.99193 7.95823 9.65491 9.8618 9.65491 12.002C9.65491 14.1421 9.99193 16.0457 10.5109 17.3867C10.7713 18.0597 11.063 18.553 11.3486 18.8652C11.6338 19.1769 11.8549 19.25 12 19.25C12.1452 19.25 12.3663 19.1769 12.6515 18.8652C12.9371 18.553 13.2287 18.0597 13.4892 17.3867C14.0082 16.0457 14.3452 14.1421 14.3452 12.002C14.3452 9.8618 14.0082 7.95823 13.4892 6.61716C13.2287 5.94419 12.9371 5.45088 12.6515 5.13871C12.3663 4.82699 12.1452 4.75391 12 4.75391C11.8549 4.75391 11.6338 4.82699 11.3486 5.13871C11.063 5.45088 10.7713 5.94419 10.5109 6.61716ZM10.2419 4.12616C10.6973 3.62843 11.2905 3.25391 12 3.25391C12.7096 3.25391 13.3028 3.62843 13.7581 4.12616C14.2131 4.62344 14.5884 5.30141 14.8881 6.0758C15.4893 7.62945 15.8452 9.72491 15.8452 12.002C15.8452 14.279 15.4893 16.3745 14.8881 17.9281C14.5884 18.7025 14.2131 19.3805 13.7581 19.8777C13.3028 20.3755 12.7096 20.75 12 20.75C11.2905 20.75 10.6973 20.3755 10.2419 19.8777C9.78696 19.3805 9.41168 18.7025 9.112 17.9281C8.51076 16.3745 8.15491 14.279 8.15491 12.002C8.15491 9.72491 8.51076 7.62945 9.112 6.0758C9.41168 5.30141 9.78696 4.62344 10.2419 4.12616Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.74609C7.99594 4.74609 4.75 7.99203 4.75 11.9961C4.75 16.0002 7.99594 19.2461 12 19.2461C16.0041 19.2461 19.25 16.0002 19.25 11.9961C19.25 7.99203 16.0041 4.74609 12 4.74609ZM3.25 11.9961C3.25 7.1636 7.16751 3.24609 12 3.24609C16.8325 3.24609 20.75 7.1636 20.75 11.9961C20.75 16.8286 16.8325 20.7461 12 20.7461C7.16751 20.7461 3.25 16.8286 3.25 11.9961Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 11.9902C3.25029 11.576 3.58631 11.2404 4.00053 11.2407L20.0005 11.252C20.4147 11.2522 20.7503 11.5883 20.75 12.0025C20.7497 12.4167 20.4137 12.7522 19.9995 12.752L3.99947 12.7407C3.58526 12.7404 3.24971 12.4044 3.25 11.9902Z" fill="#ffffff"></path> </g></svg></div>');
    } else {
        $('.headerContent').prepend('<div class="welcomeOpen svgIcon"><svg width="19px" fill="#ffffff" viewBox="0 0 20 22.487"><g transform="translate(-92.3 -72)"><path d="M109.006,266.734a10.792,10.792,0,0,0-13.407,0,9.381,9.381,0,0,0-3.3,7.54.858.858,0,0,0,.855.855h18.289a.858.858,0,0,0,.855-.855A9.361,9.361,0,0,0,109.006,266.734Zm-14.959,6.685a7.573,7.573,0,0,1,2.646-5.371,9.091,9.091,0,0,1,11.219,0,7.561,7.561,0,0,1,2.646,5.371Z" transform="translate(0 -180.643)"></path><path d="M169.246,83.292a5.646,5.646,0,1,0-5.646-5.646A5.653,5.653,0,0,0,169.246,83.292Zm0-9.581a3.935,3.935,0,1,1-3.935,3.935A3.94,3.94,0,0,1,169.246,73.711Z" transform="translate(-66.943)"></path></g></svg></div>');
    }

    $('body').on('click', '.SearchToggle', function (event) { $('.searchContent').toggleClass('active'); $(this).addClass('active'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fa fa-angle-right"></i>'); $('.CartProduct').removeClass('animated'); $('.welcome').removeClass('active'); $('#lang_flag_container').removeClass('selector'); $('#txtbxArama').focus(); $('.welcomeOpen').removeClass('active'); });
    $('body').on('click', '.welcomeOpen', function () { $('.welcome').toggleClass('active'); $('.welcomeOpen').toggleClass('active'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fa fa-angle-right"></i>'); $('.CartProduct').removeClass('animated'); $('.searchContent').removeClass('active'); $('.SearchToggle').removeClass('active'); $('#lang_flag_container').removeClass('selector'); });
    $('body').on('click', '.mobilLang', function () { $('#lang_flag_container').toggleClass('selector'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fa fa-angle-right"></i>'); $('.CartProduct').removeClass('animated'); $('.searchContent').removeClass('active'); $('.SearchToggle').removeClass('active'); $(".mobilaf").addClass("acik"); });
    $("body").on("click", ".mobilaf,.CloseBtnMenu,#lang_flag_container #lang-detail .fa-times", function (event) { $('body').removeClass('overflow transform'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fa fa-angle-right"></i>'); $('.mobilaf').removeClass('acik').removeAttr('style'); $('.searchContent').removeClass('active'); $('.SearchToggle').removeClass('active'); $('.welcome').removeClass('active'); $('.CartProduct').removeClass('animated'); $('#lang_flag_container').removeClass('selector'); $('body #divSayfalamaUst .filterBlock').removeClass('active'); $('.welcomeOpen').removeClass('active'); });
    $('body').on('click', '.mobilMenuBT', function (event) { $('.mobilMenu .navUl > li').find('ul').removeClass('active over') });
}


function SepetEkrani() {
    $('.mycart').addClass('more');
    $('.navigation .navUl').wrapAll('<div></div>');
    $('.Mic').insertAfter('.navUl');
    setTimeout(function () { var wle = $('.welcome').html(); $('.welcome').html(''); $('.welcome').append('<div>' + wle + '</div>'); }, 1500);
    urunKartCallBack();
}
function HesabimTakip() {
    $('body').addClass('HesabimTakip');
}
function Iletisimaspx() {
    $('body').addClass('Iletisimaspx');
    var uyead = globalModel.member.memberName;
    var uyemail = globalModel.member.memberEMail;
    $('#mainHolder_txtbxAdSoyad').attr('value', uyead);
    $('#mainHolder_txtbxMail').attr('value', uyemail);
    $('.iletisimLeft,.iletisimRight').wrapAll('<div class="AdBan"></div>');
    $('.iletisimForm').insertAfter('.AdBan');
    $('.iletisimLeftAdres').insertAfter('.iletisimLeftFirmaAdi');
}
function UrunDetayPaylas() {
    var title = $(".ProductName h1 span").text();
    var url = window.location.href;
    var image = location.origin + "" + $('.Images #imgUrunResim').attr('src') + "";
    var description = "";
    var link = "https://web.whatsapp.com/send?phone=905555555555&text=" + url + " Ürünü satın almak istiyorum";
    var socialAppMessage = "Bu ürünü satın almak istiyorum" + encodeURIComponent(productDetailModel.productName) + " - " + encodeURIComponent(window.location.href);
    $(".product_social_icons").on('click', function () {
        if ($(this).attr("content") == "facebook") {
            if (isMobileDevice()) {
                window.open("https://m.facebook.com/sharer.php?u=" + url + "");
            } else {
                window.open("https://www.facebook.com/sharer.php?s=100&p[medium]=100&p[title]=" + $.trim(title) + "&p[images][0]=" + image + "&p[url]=" + url + "&p[summary]=" + $.trim(title) + "&t=" + $.trim(title) + "", "sharer", "toolbar=0,status=0,width=630,height=430");
            }
        } else if ($(this).attr("content") == "twitter") {
            window.open("https://twitter.com/intent/tweet?text=" + $.trim(title) + "&url=" + url + "", "sharer", "toolbar=0,status=0,width=630,height=430");
        } else if ($(this).attr("content") == "pinterest") {
            window.open("https://pinterest.com/pin/create/button/?url=" + url + "&media=" + image + "&description=" + $.trim(title) + "", "sharer", "toolbar=0,status=0,width=630,height=430");
        } else if ($(this).attr("content") == "whatsapp") {
            if (windowidth > 768) {
                window.open(link, "toolbar=0,status=0,width=630,height=430");
            } else {
                window.location.href = "whatsapp://send?phone=905555555555&text=" + socialAppMessage;
            }
        }
    });
}
function sepetBindRefresh(res) {
    if (typeof res.cart.products != 'undefined') {
        if (res.cart.products.length > 0) {
            $('.mycart').addClass('more'); $('.CartProduct').addClass('more'); $('.SepetBlock').addClass('more'); $('.headerOrderBtn').text(translateIt('SiparisTamamla_Baslik'));
            $('.CartProduct .SProduct li').each(function () {
                if ($(this).find('.sptAdet').length == 0) { $(this).find('a:eq(0) .SepettopAd').after('<div class="sptAdet"></div>'); }
                $(this).find('.SepettopAd span:eq(0)').wrapAll('<div class="urunAd"></div>');
                $(this).find('.SepettopAd span:eq(1)').wrapAll('<div class="varyAd"></div>');
                $(this).find('.SepetTopAdet').appendTo($(this).find('.sptAdet'));
                $(this).find('.sepetTopSatisBirimi').appendTo($(this).find('.sptAdet'));
                $(this).find('.sptAdet').appendTo($(this).find('.SepettopAd'));
            });
        } else {
            $('.mycart').removeClass('more'); $('.CartProduct').removeClass('more'); $('.SepetBlock').removeClass('more');
        }
    }
    if ($('.welcome .useLogin').length == 0 && windowidth > 767 && siteSettings.isAuthenticated == true) { UseLogin(); }

    if ($('.CartProduct span').hasClass('spanustSepetteUrunYok')) { $('.CartProduct').addClass('SepetBos'); }

    if ($('.SepetUst').length == 0) {
        $('.CartProduct').prepend('<div class="SepetUst"><div class="seClose"><i class="fa fa-times"></i></div><span>' + translateIt("GlobalMasterPage_Sepetim") + '</span></div>');
    }

    if (windowidth < 768) {
        $('.mycart > a').removeAttr('href');
        $('body').on('click', '.mycartClick,.mycart .sepetUrunSayisi', function () { $('.mobilMenu').removeClass('acik'); $('body').addClass('overflow'); $('.CartProduct').addClass('animated'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fa fa-angle-right"></i>'); $('.searchContent').removeClass('active'); $('.SearchToggle').removeClass('active'); $('.welcome').removeClass('active'); $('#lang_flag_container').removeClass('selector'); $('.welcomeOpen').removeClass('active'); });
        $('#divIcerik').on('touchend', function () { $('.welcome').removeClass('active'); $('.searchContent').removeClass('active'); $('.SearchToggle').removeClass('active'); $('#divIcerik').removeClass('hoverr'); });
    }

}

$(document).on("click", ".seClose", function (event) { $('body').removeClass('overflow transform'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fa fa-angle-right"></i>'); $('.mobilaf').removeClass('acik').removeAttr('style'); $('.searchContent').removeClass('active'); $('.SearchToggle').removeClass('active'); $('.welcome').removeClass('active'); $('.CartProduct').removeClass('animated'); $('#lang_flag_container').removeClass('selector'); $('body #divSayfalamaUst .filterBlock').removeClass('active'); $('.welcomeOpen').removeClass('active'); });

$(window).on('load', function () {
    urunKartCallBack();
    if ($(".hesabimBolumuTutucu").length > 0) { HesabimTakip(); }
    if ($(".iletisimContent").length > 0) { Iletisimaspx(); }
    if ($("#lang_flag_container").length > 0) {
        $('#lang_flag_container #lang-detail').prepend('<i class="fa fa-times"></i>');
    }

    try { $("body .dinamikFormContainer select").parent().addClass("selectcontrol"); } catch (e) { }
});

$(window).on("scroll", function () {
    if (windowidth < 360) {
        // bottomHead();
    }
    mobilFooter();
    if ($('.ebultenGelecek #divNewsLetter').length == 0) {
        $('#divNewsLetter').prependTo('.ebultenGelecek');
    }
});

var mobCtrl = false;
function mobilFooter() {
    window.blockMenuHeaderScroll = false; $(window).on('touchstart', function (e) { if ($(e.target).closest('.owl-grab').length == 1) { blockMenuHeaderScroll = true; } }); $(window).on('touchend', function () { blockMenuHeaderScroll = false; }); $(window).on('touchmove', function (e) { if (blockMenuHeaderScroll) { e.preventDefault(); } });
    if (!mobCtrl) {
        $('.FooterCol > .FooterCol-Title').append('<div class="ackapabtn"><i class="fa fa-angle-down"></i></div>');
        $('.FooterCol > .FooterCol-Title .ackapabtn').on('click', function () {
            if ($(this).find('.fa').hasClass('fa-angle-down')) {
                $(this).parent().parent().find('>ul,>div:not(:eq(0))').slideDown('fast');
                $(this).html('<i class="fa fa-angle-up"></i>');
            } else {
                $(this).html('<i class="fa fa-angle-down"></i>');
                $(this).parent().parent().find('>ul,>div:not(:eq(0))').slideUp('fast');
            }
        });
        mobCtrl = true;
    }
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        var clickableElements = ".Addtobasket";
        jQuery(clickableElements).attr("style", "cursor: pointer;");
        jQuery(clickableElements).bind("touchend", function (e) {
            jQuery(this).trigger("click");
        });
    }
}
function UseLogin() {
    if (windowidth > 768) { $('.welcome').append('<div class="useLogin"> <div class="useName"><span>' + globalModel.member.memberName + '</span></div> <ul> <li class=""><a href="/Hesabim.aspx#/Siparislerim"><i class="fa fa-angle-right"></i><span>' + translateIt("Siparislerim_Baslik") + '</span></a></li> <li class=""><a href="/Hesabim.aspx#/Hesabim-Anasayfa"><i class="fa fa-angle-right"></i><span>' + translateIt("Hesabim_Baslik") + '</span></a></li> <li class=""><a href="/Hesabim.aspx#/Favorilerim"><i class="fa fa-angle-right"></i><span>' + translateIt("Favorilerim_Baslik") + '</span></a></li> <li class=""><a href="/Hesabim.aspx#/AdresDefterim"><i class="fa fa-angle-right"></i><span>' + translateIt("AdresDefterim_Baslik") + '</span></a></li> <li class=""><a href="/Hesabim.aspx#/IadeTaleplerim"><i class="fa fa-angle-right"></i><span>' + translateIt("IadeTaleplerim_Baslik") + '</span></a></li> <li class=""><a class="kargomNeredeIframe control-item" data-fancybox-type="iframe" href="/kargomnerede.aspx" vspace="500"><i class="fa fa-angle-right"></i><span>' + translateIt("Siparislerim_KargomNerede") + '</span></a></li> <li class="cikisbtn"><a href="/UyeCikis.ashx"><i class="fa fa-angle-right"></i><span>' + translateIt("Global_CikisYap") + '</span></a></li> </ul> </div> <style type="text/css"> .useLogin { display: block !important; background: #fff; float: left; padding:0; z-index: 99999; position: absolute; top: 100%; right: -12.5px; box-shadow: 0 0 16px -10px #000; opacity: 0; visibility: hidden;margin-left: -100px; -webkit-transition: all 0.3s ease; -moz-transition: all 0.3s ease; transition: all 0.3s ease; } .welcome:after { position: absolute; left: 0; right: 0; bottom: -15px; height: 15px;} .welcome:hover .useLogin { visibility: visible; opacity: 1; top: 130%; } .useLogin:before, .useLogin:after { bottom: 100%; right: 10px; border: solid transparent;height: 0; width: 0; position: absolute; pointer-events: none; } .useLogin:before { border-color: transparent; border-bottom-color: #f0f0f0; border-width: 9px; margin-left: -9px; } .useLogin:after { border-color: transparent; border-bottom-color: #fff; border-width: 8px; margin-left: -8px; right: 11px; } .useLogin ul{text-align: left;display: block;float: none;} .useLogin ul li{display: block;padding: 0;white-space: nowrap;} .useLogin ul li a{color: #000;font-size: 12px;line-height: 27px;padding: 0 15px;display: block;} .useLogin ul li a i{line-height: 27px;margin-right: 6px;font-size: 15px;font-weight: 300;display: inline-block;vertical-align:top;} .useLogin ul li.cikisbtn{background: #e6e6e6;margin-top: 10px;transition: .1s ease-in-out;}.useLogin .useName{display: block;margin-top: 10px;font-size: 12px;line-height: 27px;padding: 0 15px;font-weight:500;text-align: left;cursor: default;color:' + $('.CartProduct .headerOrderBtn').css('background-color') + ';} .useLogin ul li a:hover{color:' + $('.CartProduct .headerOrderBtn').css('background-color') + ';} .useLogin ul li.cikisbtn:hover{background:' + $('.CartProduct .headerOrderBtn').css('background-color') + ';} .useLogin ul li.cikisbtn a:hover{color: #fff;} .welcome:after {content: "";} .useLogin:before, .useLogin:after {content:"";} </style>'); }
}

function FavoriIslemCallback() {
    setTimeout(function () {
        var favSayi = GetFavoriListe().length;
        $('.HeaderFavori span').text(favSayi);
        if (favSayi > 0) {
            $('.HeaderFavori').addClass('more');
        } else {
            $('.HeaderFavori').removeClass('more');
        }
    }, 750);

}

function HeaderFixed() {
    var sepetsayfakontrol = $("body").find(".BasketPage").length;
    if (sepetsayfakontrol == 0) {
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 210) {
                $('#header').addClass('fixed');
                $('body').addClass('margin');
            }
            else {
                $('#header').removeClass('fixed');
                $('body').removeClass('margin');
            }
            if ($(this).scrollTop() > 250) {
                $('#header').addClass('gectop');
            }
            else {
                $('#header').removeClass('gectop');
            }
        });
    }
}
function UrunHizliBakisCallback() {

    setTimeout(function () {
        $(".hizliBakis_DiscountRate,.hizliBakis_UstuCiziliFiyat").length > 0 ? $("#hizliBakis #divFiyatAlanlari").addClass("IndirimHizliBakis") : "";
        $('.hizliBakis_ozyazi').insertAfter('.hizliBakis_Name');
        $('#hizliBakisTahminiTeslimatSuresi').insertAfter('.hizliBakis_Name');
        $('.UrunuIncele').insertAfter('.hizliBakis_Name');
        $('.hizliBakis_stokKodu').insertAfter('.hizliBakis_Name');
        $('.hizliBakis_marka').insertBefore('.hizliBakis_Name');
        $('.hizliBakis_markaLogo').prependTo('.PreviewselectedImagesBox');
        $('.UrunuIncele').prependTo('.PreviewselectedImagesBox');
        $('#hizliBakis #divOzelAlan1').appendTo('.ProductPreviewRight');
        $('#hizliBakis #divOzelAlan2').appendTo('.ProductPreviewRight');
        $('#hizliBakis #divOzelAlan3').appendTo('.ProductPreviewRight');
        $('#hizliBakis #divOzelAlan4').appendTo('.ProductPreviewRight');
        $('#hizliBakis #divOzelAlan5').appendTo('.ProductPreviewRight');
    }, 250);

}
function UrunHizliBakisEkSecenekCallback() {
    UrunHizliBakisCallback();
}

function urunKartCallBack() {
    $(".productItem").each(function () {
        if ($(this).find(".productIconWrap").length == 0) {
            $(this).find(".productImage").after('<div class="productIconWrap"></div>');
            $(this).find(".newIcon").closest(".productItem").addClass("YeniUrun");
            $(this).find(".productPrice").find(".regularPrice").parent().addClass("IndirimVar");
            $(this).find(".TukendiIco").closest(".productItem").addClass("StokYok");
            $(this).find(".regularPrice").closest(".productItem").addClass("IndirimliUrun");
            $(this).find(".firsatIcon").closest(".productItem").addClass("FirsatUrun");
            $(this).find(".productTimer").closest(".productItem").addClass("SayacliUrun");
            $(this).find(".ozelAlan1,.ozelAlan2,.ozelAlan3,.ozelAlan4,.ozelAlan5").closest(".productItem").addClass("OzelAlanAktif");
            $(this).find("video").closest(".productItem").addClass("VideoluUrun");
            $(this).find(".ozelAlan1,.ozelAlan2,.ozelAlan3,.ozelAlan4,.ozelAlan5").wrapAll("<div class='ozelAlanEx'></div>");
            $(this).find('.ozelAlan1,.ozelAlan2,.ozelAlan3,.ozelAlan4,.ozelAlan5').find("img").closest('.ozelAlan1,.ozelAlan2,.ozelAlan3,.ozelAlan4,.ozelAlan5').addClass("resimli");
            $(this).find(".favori,.mycartIcon,.examineIcon").wrapAll("<div class='productEx'></div>");
            $(this).find(".newIcon,.discountIcon,.firsatIcon").wrapAll("<div class='productIconLeft'></div>");
            $(this).find(".cargoIcon,.urunListStokUyari,.urunListSonUrun,.hizliKargoIcon").wrapAll("<div class='productIconRight'></div>");
            $(this).find(".ozelAlanEx").appendTo($(this).find(".productIconWrap"));
            $(this).find(".productEx").appendTo($(this).find(".productIconWrap"));
            $(this).find(".productIconLeft").appendTo($(this).find(".productIconWrap"));
            $(this).find(".productIconRight").appendTo($(this).find(".productIconWrap"));
            $(this).find(".TukendiIco").appendTo($(this).find(".productIconWrap"));
            $(this).find(".quickViewIco").appendTo($(this).find(".productIconWrap"));
            $(this).find(".boxBedenlerContent").prependTo($(this).find(".productDetail"));
            $(this).find(".productTimer").prependTo($(this).find(".productDetail"));
            if ($(this).find(".productPoints").length === 0) {
                $(this).find(".productName").after(`
                    <div class="productPoints">
                        <div class="rating" data-rating="0">
                            <i class="star-1">★</i>
                            <i class="star-2">★</i>
                            <i class="star-3">★</i>
                            <i class="star-4">★</i>
                            <i class="star-5">★</i>
                        </div>
                    </div>
                    <div class="productPointTxt">0</div>
                `);
            }
        }
    });

    $(".productItem").find("video").parent().addClass("Videolu");
}

$('html').attr("title", "html");
$('.HeaderLogo a').each(function () {
    imgwidth4 = $(this).find('img').width();
    imgheight4 = $(this).find('img').height();
    $(this).find('img').attr("width", imgwidth4);
    $(this).find('img').attr("height", imgheight4);
    $(this).find('img').attr("alt", "logo");
});
$('#footer').each(function () {
    imgwidth66 = $(this).find('img').width();
    imgheight66 = $(this).find('img').height();
    $(this).find('img').attr("width", imgwidth66);
    $(this).find('img').attr("height", imgheight66);
});
$('.mobilTicimaxLogo').each(function () {
    imgwidth7 = $(this).find('img').width();
    imgheight7 = $(this).find('img').height();
    $(this).find('img').attr("width", imgwidth7);
    $(this).find('img').attr("height", imgheight7);
});
$('.FooterSocial ul li').each(function () {
    var smTitle = $(this).find('a i').attr('class').split(" ").splice(1, 1).join(" ");
    $(this).find('a').attr("aria-label", smTitle);
});
function sayfaTasarim() {

    if ($('#mainHolder_divDesign').length > 0) {
        setTimeout(function () { $('.katSliderBlock ul').owlCarousel({ autoplay: false, loop: false, rewind: true, lazyLoad: true, navClass: ['ProductListprev', 'ProductListnext'], margin: 20, nav: false, responsive: { 0: { items: 3, margin: 10 }, 768: { items: 5 }, 1025: { items: 6 }, 1160: { items: 9 } }, onInitialized: function callback() { if (typeof lazyLoad === "function") { lazyLoad(); } } }); }, 300);



        urunKartCallBack();

        // setTimeout(() => {
        //     $('#start_button').each(function(){
        //         $(this).find('img').attr("width", 50);
        //         $(this).find('img').attr("height", 50);
        //     });
        //     // $('.mycart').each(function(){
        //     //     $(this).find('a').attr("href", "javascript:void(0)");
        //     // });
        //     $('.insider-opt-in-notification-button-container').each(function(){
        //         $(this).find('a').attr("href", "javascript:void(0);");
        //     });
        //     $('.blokResimLink').each(function(){
        //         imgwidth = $(this).find('img').width();
        //         imgheight = $(this).find('img').height();
        //         $(this).find('img').attr("width", imgwidth);
        //         $(this).find('img').attr("height", imgheight);
        //     });
        //     $('.markaSlider ul li a').each(function(){
        //         imgwidth1 = $(this).find('img').width();
        //         imgheight1 = $(this).find('img').height();
        //         $(this).find('img').attr("width", imgwidth1);
        //         $(this).find('img').attr("height", imgheight1);
        //     });
        //     $('.menulinks ul li a').each(function(){
        //         imgwidth2 = $(this).find('img').width();
        //         imgheight2 = $(this).find('img').height();
        //         $(this).find('img').attr("width", imgwidth2);
        //         $(this).find('img').attr("height", imgheight2);
        //     });
        //     window.onresize = function(event) {
        //         $('.FooterIcons ul li div').each(function(){
        //             imgwidth3 = $(this).find('img').width();
        //             imgheight3 = $(this).find('img').height();
        //             $(this).find('img').attr("width", imgwidth3);
        //             $(this).find('img').attr("height", imgheight3);
        //         });
        //     };
        //     $('.footerimg a').each(function(){
        //         imgwidth5 = $(this).find('img').width();
        //         imgheight5 = $(this).find('img').height();
        //         $(this).find('img').attr("width", imgwidth5);
        //         $(this).find('img').attr("height", imgheight5);
        //     });
        //     $('.footerBankLogo li').each(function(){
        //         imgwidth6 = $(this).find('img').width();
        //         imgheight6 = $(this).find('img').height();
        //         $(this).find('img').attr("width", imgwidth6);
        //         $(this).find('img').attr("height", imgheight6);
        //     });
        //     $('.owl-dots').each(function(){
        //         $('button').attr("aria-label","dots");
        //     });
        // }, 1000);

        $('.landing-block .Blog-List > ul').each(function () {
            if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel"))
                $(this).owlCarousel({
                    autoplay: false,
                    loop: false,
                    rewind: true,
                    lazyLoad: true,
                    navClass: ['ProductListprev', 'ProductListnext'],
                    margin: 20,
                    nav: true,
                    responsive: { 0: { items: 2, margin: 10 }, 768: { items: 3 }, 1025: { items: 3 }, 1160: { items: 3 } }
                });
        });

        $('.markaSlider  ul').each(function () {
            if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel"))
                $(this).owlCarousel({
                    autoplay: false,
                    loop: false,
                    rewind: true,
                    lazyLoad: true,
                    navClass: ['ProductListprev', 'ProductListnext'],
                    margin: 20,
                    nav: true,
                    responsive: { 0: { items: 3, margin: 10 }, 768: { items: 5 }, 1025: { items: 7 }, 1160: { items: 9 } }
                });
        });
    }
}
