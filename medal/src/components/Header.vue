<template>
  <div>
    <div class="window d-none"></div>

    <div class="d-none toggle" id="sign-in">
      <div class="form-wrap border-radius shadow">
        <div class="form__image d-none d-md-block">
          <img src="@/assets/img/form_in.jpg" alt="">
        </div>
        <div class="form__aside">
          <div class="form__title d-flex justify-content-between align-items-center">
            <div class="font-18 letter bold">Вход</div>
            <i class="icon icon-close"></i>
          </div>
          <div class="form__other">
            <form action="" class="form">
              <div class="form-border">
                <div class="input__placeholder">
                  <span>E-mail</span>
                  <input type="text">
                </div>
                <div class="input__placeholder">
                  <span>Пароль</span>
                  <input type="text">
                </div>
              </div>
              <div class="d-flex justify-content-between margin-t_20">
                <div>
                  <input type="checkbox" id="check">                
                  <label for="check" class="font-12">Запомнить меня</label>
                </div>
                <a href="#" class="font-12 under">Забыли пароль?</a>
              </div>
              <input type="submit" value="Войти" class="margin-t_30">
              <div class="d-flex justify-content-between margin-t_20">
                <a href="#" class="font-12">У Вас нет аккаунта?</a>
                <a href="#" class="font-12 under hide-toggle" data-open="#sign-up">Зарегистрируйтесь</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="d-none toggle" id="sign-up">
      <div class="form-wrap border-radius shadow">
        <div class="form__image d-none d-md-block">
          <img src="@/assets/img/form_up.jpg" alt="">
        </div>
        <div class="form__aside">
          <div class="form__title d-flex justify-content-between align-items-center">
            <div class="font-18 letter bold">Регистрация</div>
            <i class="icon icon-close"></i>
          </div>
          <div class="form__other">
            <form action="" class="form">
              <div class="form-border">
                <div class="input__placeholder">
                  <span>Имя</span>
                  <input type="text">
                </div>
                <div class="input__placeholder">
                  <span>Компания</span>
                  <input type="text">
                </div>
                <div class="input__placeholder">
                  <span>Телефон</span>
                  <input type="text">
                </div>
                <div class="input__placeholder">
                  <span>E-mail</span>
                  <input type="text">
                </div>
                <div class="input__placeholder">
                  <span>Пароль</span>
                  <input type="text">
                </div>
              </div>
              <div class="d-flex justify-content-center margin-30_a margin-t_20">
                <a href="#"><i class="icon icon-facebook"></i></a>
                <a href="#"><i class="icon icon-google"></i></a>
              </div>
              <input type="submit" value="Регистрация" class="margin_t_30">
              <div class="d-flex justify-content-between margin-t_20">
                <a href="#" class="font-12">Уже есть акаунт?</a>
                <a href="#" class="font-12 under hide-toggle" data-open="#sign-in">Войти</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="header-top bg-dark" id="top">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-12 col-sm-auto left">
            <ul class="ul d-flex w-100p">
              <li><a href="about.html">О компании</a></li>
              <li><a href="pay.html">Доставка и оплата</a></li>
              <li><a href="contact.html">Контакты</a></li>
            </ul>
          </div>
          <div class="col-12 col-sm-auto right d-flex justify-content-between justifyc-content-sm-start">
            <div class="tel">
              <i class="icon icon-phone margin-r_5"></i>
              <a href="tel:0503425486">050 342 54 86</a>
            </div>
            <div class="lang">
              <form action="" method="post" enctype="multipart/form-data" id="language">
                <ul>
                  <li class="has-submenu">
                    <a href="#">ru</a>
                    <ul class="submenu d-none">
                      <li><a href="ru">ru</a></li>
                      <li><a href="uk">ua</a></li>
                    </ul>
                  </li>
                </ul>
                <input name="code" value="" type="hidden">
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    

    <div class="navbar color-black">
      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="col-auto d-block d-lg-none">
            <div id="sandwich">
              <div class="sw-topper"></div>
              <div class="sw-bottom"></div>
              <div class="sw-footer"></div>
            </div>
          </div>
          <div class="col-auto brand-wrap">
            <h1 class="brand"><a href="index.html">Медаль ТОП</a></h1>
          </div>
          <div class="col-12 col-xl-auto menu-wrap order-last order-xl-0 order-spec">
            <nav class="nav nav-main d-none d-lg-block">
              <ul class="ul menu d-flex flex-column flex-lg-row justify-content-between">
                <li><a href="constructor.html">Создать свой кубок</a></li>
                <li class="has-submenu">
                  <a href="catalog_subcat.html">Кубки</a>
                  <ul class="ul submenu">
                    <li><a href="catalog.html">Кубки элит</a></li>
                    <li><a href="catalog.html">Кубки МЯЧ</a></li>
                    <li><a href="catalog.html">Кубки престиж 3000</a></li>
                    <li><a href="catalog.html">Кубки стандарт 2000</a></li>
                    <li><a href="catalog.html">Кубки эконом 1000</a></li>
                  </ul>
                </li>
                <li class="has-submenu">
                  <a href="catalog.html">Медали</a>
                  <ul class="ul submenu">
                    <li><a href="catalog.html">Кубки элит</a></li>
                    <li><a href="catalog.html">Кубки МЯЧ</a></li>
                    <li><a href="catalog.html">Кубки престиж 3000</a></li>
                    <li><a href="catalog.html">Кубки стандарт 2000</a></li>
                    <li><a href="catalog.html">Кубки эконом 1000</a></li>
                  </ul>
                </li>
                <li><a href="catalog_subcat.html">Статуэкти</a></li>
                <li><a href="catalog.html">Плакетки</a></li>
                <li><a href="catalog.html">Ленты</a></li>
                <li><a href="catalog.html">Жетоны</a></li>
                <li class="has-submenu open-nav">
                  <a href="catalog_subcat.html">Больше</a>
                  <ul class="ul submenu">
                    <li><a href="catalog.html">Грамоты</a></li>
                    <li class="has-submenu">
                      <a href="catalog.html">Шильдики</a>
                      <ul class="ul submenu">
                        <li><a href="catalog.html">Кубки элит</a></li>
                        <li><a href="catalog.html">Кубки МЯЧ</a></li>
                        <li><a href="catalog.html">Кубки престиж 3000</a></li>
                        <li><a href="catalog.html">Кубки стандарт 2000</a></li>
                        <li><a href="catalog.html">Кубки эконом 1000</a></li>
                      </ul>
                    </li>
                    <li><a href="catalog.html">Стекло</a></li>
                    <li><a href="catalog.html">Тарелки</a></li>
                    <li><a href="catalog.html">Накладки на плакетки</a></li>
                    <li><a href="catalog.html">Коробки под медаль</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-auto icon-wrap">
            <a href="#" class="ic">
              <img src="@/assets/img/icon_search.svg" alt="">
            </a>
            <a href="#" data-open="#sign-in" class="ic">
              <img src="@/assets/img/icon_people.svg" alt="">
            </a>
            <a href="favorite.html" class="ic">
              <img src="@/assets/img/icon_star.svg" alt="">
              <span class="notify">8</span>
            </a>
            <a href="bag.html" class="ic">
              <img src="@/assets/img/icon_bag.svg" alt="">
              <span class="notify">2</span>
            </a>
          </div>
          <nav class="col-12 nav nav-bottom d-none">
            <div class="container">
              <div class="row">
                <div class="col-lg-4 menu-wrap">
                  <ul class="ul menu">
                    <li data-hover="#cups"><a href="catalog_subcat.html">Кубки</a></li>
                    <li><a href="catalog.html">Медали</a></li>
                    <li data-hover="#statues"><a href="catalog_subcat.html">Статуэкти</a></li>
                    <li><a href="catalog.html">Плакетки</a></li>
                  </ul>

                  <!-- *******************************************
                    sorry but maket and menu so so so bad for OpenCart, Wordpress, I don`t know how do this another 
                  *******************************************
                  -->
                  <ul class="ul submenu" id="cups">
                    <li><a href="catalog.html">Кубки элит</a></li>
                    <li><a href="catalog.html">Кубки МЯЧ</a></li>
                    <li><a href="catalog.html">Кубки престиж 3000</a></li>
                    <li><a href="catalog.html">Кубки эконом 1000</a></li>
                  </ul>
                  <ul class="ul submenu" id="statues">
                    <li><a href="catalog.html">Кубки элит</a></li>
                    <li><a href="catalog.html">Кубки престиж 3000</a></li>
                    <li><a href="catalog.html">Кубки стандарт 2000</a></li>
                  </ul>
                </div>
                <div class="col-lg-4 menu-wrap">
                  <ul class="ul menu">
                    <li data-hover="#lents"><a href="catalog.html">Ленты</a></li>
                    <li><a href="catalog.html">Жетоны</a></li>
                    <li><a href="catalog.html">Грамоты</a></li>
                    <li><a href="catalog.html">Шильдики</a></li>
                  </ul>

                  <ul class="ul submenu" id="lents">
                    <li><a href="catalog.html">Кубки элит</a></li>
                    <li><a href="catalog.html">Кубки МЯЧ</a></li>
                    <li><a href="catalog.html">Кубки престиж 3000</a></li>
                    <li><a href="catalog.html">Кубки эконом 1000</a></li>
                  </ul>
                </div>
                <div class="col-lg-4 menu-wrap">
                  <ul class="ul menu">
                    <li><a href="catalog.html">Стекло</a></li>
                    <li><a href="catalog.html">Тарелки</a></li>
                    <li data-hover="#box"><a href="catalog.html">Накладки на плакетки</a></li>
                    <li><a href="catalog.html">Коробки под медаль</a></li>
                  </ul>

                  <ul class="ul submenu" id="box">
                    <li><a href="catalog.html">Кубки элит</a></li>
                    <li><a href="catalog.html">Кубки МЯЧ</a></li>
                    <li><a href="catalog.html">Кубки престиж 3000</a></li>
                    <li><a href="catalog.html">Кубки эконом 1000</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>