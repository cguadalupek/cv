/*
*   Author: bslthemes
*   Author URL: http://themeforest.net/user/bslthemes
*   Version: 2.7
*/


/*
	Preloader
*/

$(window).on("load", function() {
	var preload = $('.preloader');
	preload.find('.spinner').fadeOut(function(){
		preload.fadeOut();
	});
});

$(function () {
	'use strict';


	/*
		Vars
	*/

	var width = $(window).width();
	var height = $(window).height();


	/*
		Typed
	*/

	$('.subtitle.subtitle-typed').each(function(){
		var subtitleContainer = $(this);

		subtitleContainer.typed({
			stringsElement: subtitleContainer.find('.typing-title'),
			backDelay: 3500, /* Delay in text change */
			typeSpeed: 0, /* Typing speed */
			loop: true
		});
	});


	/*
		Sidebar Show/Hide
	*/

	$('header, .profile').on('click', '.menu-btn', function(){
		$('.s_overlay').fadeIn();
		$('.content-sidebar').addClass('active');
		$('body,html').addClass('sidebar-open');
		return false;
	});
	$('.content-sidebar, .container').on('click', '.close, .s_overlay', function(){
		$('.s_overlay').fadeOut();
		$('.content-sidebar').removeClass('active');
		$('body,html').removeClass('sidebar-open');
	});


	/*
		Popup Menu Navigation
	*/

	$('.main-menu li.page_item_has_children').each(function(){
		$(this).find('> a').after('<span class="children_toggle"></span>');
	});
	$('.main-menu').on('click', '.children_toggle', function(){
		var main_menu_item = $(this).closest('.page_item_has_children');
		if(main_menu_item.hasClass('open')) {
			main_menu_item.removeClass('open');
			main_menu_item.find('> ul').slideUp(250);
		} else {
			main_menu_item.addClass('open');
			main_menu_item.find('> ul').slideDown(250);
		}
	});


	/*
		Default Menu
	*/

	$('.lnk-view-menu').on('click', function(){
		var btn_text1 = $(this).find('.text').text();
		var btn_text2 = $(this).find('.text').data('text-open');
		if($('.profile').hasClass('default-menu-open')){
			$('.profile').removeClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		} else {
			$('.profile').addClass('default-menu-open');
			$(this).find('.text').data('text-open', btn_text1);
			$(this).find('.text').text(btn_text2);
		}

		return false;
	});


	/*
		Header Menu Desktop
	*/

	var container = $('.container');
	var card_items = $('.card-inner');
	var animation_in = container.data('animation-in');
	var animation_out = container.data('animation-out');

	$('.top-menu').on('click', 'a', function(){

		/* vars */
		var custom_width = 1024;
		var width = $(window).width();
		var id = $(this).attr('href');
		var h = parseFloat($(id).offset().top);
		var card_item = $(id);
		var menu_items = $('.top-menu li');
		var menu_item = $(this).closest('li');
		var d_lnk = $('.lnks .lnk.discover');

		if($('.new-skin').length) {
		custom_width = 1200;
		}
		if(!$('.new-skin').length) {
		custom_width = 1024;
		}

		if((width >= custom_width)) {

			/* if desktop */
			if(!menu_item.hasClass('active') & (width > 1023) & $('#home-card').length) {

				/* close card items */
				menu_items.removeClass('active');
				container.find(card_items).removeClass('animated '+animation_in);

				if($(container).hasClass('opened')) {
					container.find(card_items).addClass('animated '+animation_out);
				}

				/* open card item */
				menu_item.addClass('active');
				container.addClass('opened');
				container.find(card_item).removeClass('animated '+animation_out);
				container.find(card_item).addClass('animated '+animation_in);

				$(card_items).addClass('hidden');

				$(card_item).removeClass('hidden');
				$(card_item).addClass('active');
			}
		}
		/* if tablet */
		if((width < custom_width) & (width > 560) & $('#home-card').length) {

			/* scroll to section */
			$('body,html').animate({
				scrollTop: h
			}, 800);
		}
		/* if mobile */
		if((width < 561) & $('#home-card').length) {

			/* scroll to section */
			$('body,html').animate({
				scrollTop: h - $('.header').height()
			}, 800);
		}

		if (this.hash == '#about-card') {
			history.replaceState(null, null, ' ');
			return false;
		}
		return true;
	});
	if((width >= 1200)) {
	if (window.location.hash) {
		// Find the entry in the menu corresponding to the hash in the address bar url
		$('.top-menu a[href=\'' + window.location.hash + '\']')
			.find('.link')
			.trigger('click');
	
		if (window.location.hash == '#about-card') {
			history.replaceState(null, null, ' ');
		}
	}
	}

	$(window).on('resize', function(){
		var width = $(window).width();
		var height = $(window).height();
		var custom_width = 1024;

		if($('.new-skin').length) {
		custom_width = 1200;
		}
		if(!$('.new-skin').length) {
		custom_width = 1024;
		}
		if((width < custom_width)) {
			$('.card-inner').removeClass('hidden');
			$('.card-inner').removeClass('fadeOutLeft');
			$('.card-inner').removeClass('rotateOutUpLeft');
			$('.card-inner').removeClass('rollOut');
			$('.card-inner').removeClass('jackOutTheBox');
			$('.card-inner').removeClass('fadeOut');
			$('.card-inner').removeClass('fadeOutUp');
			$('.card-inner').removeClass('animated');

			$(window).on('scroll', function(){
				var scrollPos = $(window).scrollTop();
				$('.top-menu ul li a').each(function () {
					var currLink = $(this);
					var refElement = $(currLink.attr("href"));
					if((width > 561)) {
						if (refElement.offset().top - 100 <= scrollPos) {
							$('.top-menu ul li').removeClass("active");
							currLink.closest('li').addClass("active");
						}
					} else {
						if (refElement.offset().top - $('.header').height() <= scrollPos) {
							$('.top-menu ul li').removeClass("active");
							currLink.closest('li').addClass("active");
						}
					}
				});
			});

			$('.card-inner .card-wrap').slimScroll({destroy: true});
			$('.card-inner .card-wrap').attr('style', '');
		}
		else {
			$($('.top-menu li.active a').attr('href')).addClass('active');
			if((!$('.page').hasClass('new-skin')) && (width > custom_width)) {
				$('.card-inner .card-wrap').slimScroll({
					height: '570px'
				});
			}
		}

		/*
			Dotted Skills Line On Resize Window
		*/
		setTimeout(skillsDotted_resize, 750);
	});

	/*
		Dotted Skills Line On Resize Window
	*/

	function skillsDotted_resize() {
		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
		}
	}


	/*
		Smoothscroll
	*/

	if((width < 1024) & $('#home-card').length) {
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if((width > 561)) {
					if (refElement.offset().top - 100 <= scrollPos) {
						$('.top-menu ul li').removeClass("active");
						currLink.closest('li').addClass("active");
					}
				} else {
					if (refElement.offset().top - $('.header').height() - 10 <= scrollPos) {
						$('.top-menu ul li').removeClass("active");
						currLink.closest('li').addClass("active");
					}
				}
			});
		});
	}


	/*
		slimScroll
	*/

	if((!$('.page').hasClass('new-skin')) && (width > 1024)) {
		$('.card-inner .card-wrap').slimScroll({
			height: '570px'
		});
	}


	/*
		Hire Button
	*/

	$('.lnks').on('click', '.lnk.discover', function(){
		$('.top-menu a[href="#contacts-card"]').trigger('click');
	});


	/*
		Initialize Portfolio (Isotope)
		No aplicar a Blog ni Proyectos personalizados: usan CSS Grid; Isotope fuerza position:absolute y una sola columna.
	*/
	var $container = $('.grid-items').not('.content.works.works-projects .grid-items, .content.blog.blog-cards-grid .grid-items');
	if ($container.length) {
		$container.imagesLoaded(function() {
			$container.isotope({
				percentPosition: true,
				itemSelector: '.grid-item'
			});
		});
	}


	/*
		Filter items on button click
	*/
	$('.filter-button-group').on('click', '.f_btn', function() {
		if (!$container.length) {
			return;
		}
		var filterValue = $(this).find('input').val();
		$container.isotope({ filter: '.' + filterValue });
		$('.filter-button-group .f_btn').removeClass('active');
		$(this).addClass('active');
	});


	/*
		Gallery popup
	*/
	if(/\.(?:jpg|jpeg|gif|png)$/i.test($('.gallery-item:first a').attr('href'))){
		$('.gallery-item a').magnificPopup({
			gallery: {
				enabled: true
			},
			type: 'image',
			closeBtnInside: false,
			mainClass: 'mfp-fade'
		});
	}


	/*
		Media popup
	*/
	$('.has-popup-media').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade popup-box-inline'
	});


	/*
		Image popup
	*/
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});


	/*
		Video popup
	*/
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		iframe: {
			patterns: {
				youtube_short: {
				  index: 'youtu.be/',
				  id: 'youtu.be/',
				  src: 'https://www.youtube.com/embed/%id%?autoplay=1'
				}
			}
		},
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		callbacks: {
			markupParse: function(template, values, item) {
				template.find('iframe').attr('allow', 'autoplay');
			}
		}
	});


	/*
		Music popup
	*/
	$('.has-popup-music').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});


	/*
		Gallery popup
	*/
	$('.has-popup-gallery').on('click', function() {
		var gallery = $(this).attr('href');

		$(gallery).magnificPopup({
			delegate: 'a',
			type:'image',
			closeOnContentClick: false,
			mainClass: 'mfp-fade',
			removalDelay: 160,
			fixedContentPos: false,
			gallery: {
				enabled: true
			}
		}).magnificPopup('open');

		return false;
	});


	/*
		Validate Contact Form
	*/

	$("#cform").validate({
		ignore: ".ignore",
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			hiddenRecaptcha: {
				required: function () {
					if (grecaptcha.getResponse() == '') {
						return true;
					} else {
						return false;
					}
				}
			}
		},
		success: "valid",
		submitHandler: function() {
			$.ajax({
				url: 'mailer/feedback.php',
				type: 'post',
				dataType: 'json',
				data: 'name='+ $("#cform").find('input[name="name"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
				beforeSend: function() {

				},
				complete: function() {

				},
				success: function(data) {
					$('#cform').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				}
			});
		}
	});


	/*
		Validate Commect Form
	*/

	$("#comment_form").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			}
		},
		success: "valid",
		submitHandler: function() {
		}
	});


	/*
		Google Maps
	*/

	if($('#map').length) {
		initMap();
	}


	/*
		Tesimonials Carousel
	*/
	var revs_slider = $(".revs-carousel.default-revs .owl-carousel");

	revs_slider.owlCarousel({
		margin: 0,
		items: 1,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		loop: true,
		rewind: false,
		nav: false,
		dots: true
	});

	var rtl_revs_slider = $(".revs-carousel.rtl-revs .owl-carousel");

	rtl_revs_slider.owlCarousel({
		margin: 0,
		items: 1,
		rtl: true,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		loop: true,
		rewind: false,
		nav: false,
		dots: true
	});


	/*
		New JS
	*/

	$(window).on('resize', function(){
		/*
			Dotted Skills Line On Resize Window
		*/

		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
		}

		/*
			Testimonials Carousel On Resize Window
		*/

		var revs_slider = $(".revs-carousel .owl-carousel");
		revs_slider.find('.revs-item').css({'max-width':revs_slider.width()});
	});

	/*
		Dotted Skills Line
	*/

	function skills(){
		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.append('<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage').append('<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w});
		}
	}
	setTimeout(skills, 1000);

	/*
		Circle Skills Line
	*/

	var skills_circles = $('.skills-list.circles .progress');
	if(skills_circles.length){
		skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
	}

	/*
		Wrap First Title Word
	*/

	$('.content .title').each(function(index) {
	    var title = $(this).text().split(' ');
	    if(title.length>1){
		    var firstWord = title[0];
		    var replaceWord = '<span class="first-word">' + firstWord + '</span>';
		    var newString = $(this).html().replace(firstWord, replaceWord);
		    $(this).html(newString);
		} else {
			$(this).html('<div class="first-letter">'+ $(this).html() + '</div>');
		}
	});

	/*
		Proyectos: popup centrado (sin panel lateral). Sin repo → bloque YouTube (enlace + iframe opcional).
	*/
	var CV_YT_CHANNEL = 'https://www.youtube.com/@kevin_carmen';

	function buildYoutubeEmbedSrc(videoId, embedQs) {
		var qs = (embedQs || 'rel=0').replace(/^\?/, '');
		if (!/(^|&)playsinline=/.test(qs)) {
			qs = qs ? qs + '&playsinline=1' : 'playsinline=1';
		}
		if (!/(^|&)modestbranding=/.test(qs)) {
			qs += '&modestbranding=1';
		}
		try {
			var o = window.location.origin;
			if (o && /^https?:\/\//i.test(o)) {
				qs += '&origin=' + encodeURIComponent(o);
			}
		} catch (e) {}
		return 'https://www.youtube-nocookie.com/embed/' + videoId + '?' + qs;
	}

	var CV_PROJECTS = {
		proxmox: {
			kicker: 'Infraestructura',
			title: 'Homelab Virtualizado con Proxmox',
			problema: 'Necesitaba un entorno unificado para laboratorios, pruebas y servicios internos sin depender de equipos dispersos.',
			solucion: 'Homelab basado en Proxmox VE con VMs, redes virtuales y almacenamiento compartido para despliegues repetibles y aislamiento por proyecto.',
			tech: ['Proxmox VE', 'KVM', 'Linux', 'Redes virtuales', 'Almacenamiento'],
			youtube: CV_YT_CHANNEL,
			youtubeLead: 'Este proyecto no tiene repositorio público: los avances y demos los comparto en mi canal de YouTube.',
			youtubeVideoId: ''
		},
		multimedia: {
			kicker: 'Multimedia',
			title: 'Plataforma Multimedia Auto-Hospedada',
			problema: 'Centralizar biblioteca multimedia y acceso cómodo sin depender solo de servicios externos.',
			solucion: 'Stack auto-hospedado con contenedores, proxy inverso y acceso seguro desde la red local (y remoto cuando aplica).',
			tech: ['Docker', 'Nginx', 'HTTPS', 'Biblioteca multimedia', 'Acceso remoto'],
			youtube: CV_YT_CHANNEL,
			youtubeLead: 'Configuración y recorrido por la plataforma: míralo en YouTube (sin repo en GitHub).',
			youtubeVideoId: ''
		},
		monitoreo: {
			kicker: 'Operaciones',
			title: 'Sistema de Monitoreo y Alta Disponibilidad',
			problema: 'Poca visibilidad del estado de servicios y riesgo de downtime sin alertas tempranas.',
			solucion: 'Monitoreo de métricas y salud de servicios con paneles y alertas; criterio para verificar redundancia según criticidad.',
			tech: ['Métricas', 'Alertas', 'Dashboards', 'Docker / servicios', 'Uptime'],
			youtube: CV_YT_CHANNEL,
			youtubeLead: 'Paneles, alertas y lecciones aprendidas: contenido en el canal, no en GitHub.',
			youtubeVideoId: ''
		},
		backups: {
			kicker: 'Resiliencia',
			title: 'Automatización de Backups en Infraestructura Virtual',
			problema: 'Copias manuales inconsistentes y difícil garantizar recuperación ante fallos.',
			solucion: 'Políticas de backup automatizadas con retención y comprobaciones periódicas sobre VMs y datos relevantes.',
			tech: ['Proxmox / snapshots', 'Scripts', 'Programación (cron)', 'Almacenamiento'],
			youtube: CV_YT_CHANNEL,
			youtubeLead: 'Scripts y flujo de backup explicados en video; enlazo el canal (sin repo público).',
			youtubeVideoId: ''
		},
		chatbot: {
			kicker: 'IA local',
			title: 'Proyecto: Chatbot IA Local',
			problema: 'Consultar documentos técnicos rápidamente.',
			solucion: 'Desarrollé un chatbot con RAG que consulta documentos locales.',
			tech: ['Python', 'Ollama', 'LangChain'],
			repo: 'https://github.com/kevin/chatbot-rag'
		},
		precios: {
			kicker: 'Producto',
			title: 'Comparador de Precios de Hardware',
			problema: 'Comparar precios entre tiendas y listados consume tiempo y es fácil equivocarse.',
			solucion: 'Herramienta en desarrollo para reunir fuentes y mostrar comparativas en una interfaz clara (estado: en desarrollo).',
			tech: ['Python', 'APIs / scraping', 'Frontend web', 'Datos estructurados'],
			youtube: CV_YT_CHANNEL,
			youtubeLead: 'Seguimiento del desarrollo y prototipos en YouTube; aún no hay código publicado.',
			youtubeVideoId: ''
		}
	};

	var CV_BLOG = {
		proxmox: {
			meta: 'Homelab · Tutorial',
			title: 'Cómo instalar Proxmox',
			body: 'Pasos y buenas prácticas para levantar Proxmox VE en tu servidor o PC, redes y almacenamiento inicial.',
			youtube: CV_YT_CHANNEL,
			youtubeLead: 'Tutorial completo en mi canal de YouTube.',
			youtubeVideoId: ''
		},
		navidrome: {
			meta: 'Docker · Música',
			title: 'Tu propio Spotify con Navidrome en Docker',
			body: 'Biblioteca auto-hospedada estilo streaming: contenedor, volúmenes y acceso desde la red local.',
			youtube: CV_YT_CHANNEL,
			youtubeLead: 'Despliegue y uso en video en el canal.',
			youtubeVideoId: ''
		},
		omv: {
			meta: 'NAS · Almacenamiento',
			title: 'Cómo instalar Open Media Vault',
			body: 'NAS ligero sobre Debian: discos, usuarios, SMB/NFS y primeros servicios para tu homelab.',
			youtube: CV_YT_CHANNEL,
			youtubeLead: 'Instalación y consejos en YouTube.',
			youtubeVideoId: ''
		},
		servidor: {
			meta: 'DIY · Servidor',
			title: 'Cómo ensamblar tu propio servidor casero',
			body: 'Elegir placa, RAM, fuente, refrigeración y caja para un equipo estable 24/7 sin gastar de más.',
			youtube: CV_YT_CHANNEL,
			youtubeLead: 'Montaje y pruebas en el canal.',
			youtubeVideoId: ''
		},
		womic: {
			meta: 'Tutorial · Audio · Wo Mic',
			title: 'Convertir tu celular en micrófono',
			bodyHtml:
				'<p><strong>Wo Mic</strong> es una herramienta excelente que permite transformar tu smartphone (Android o iOS) en un micrófono inalámbrico para tu computadora. Es la solución perfecta si necesitas un micro para videollamadas, streaming o juegos y no tienes uno a la mano.</p>' +
				'<h4 style="color: #ff9800; margin-top: 20px;">Configuración en Windows:</h4>' +
				'<ul style="list-style: decimal; padding-left: 20px; margin-top: 10px;">' +
				'<li><strong>Drivers y Cliente</strong>: Descarga e instala el <em>Wo Mic Driver</em> y el <em>Wo Mic Client</em> en tu PC desde su página oficial. El driver es esencial para que Windows reconozca el celular como un dispositivo de entrada de audio real.</li>' +
				'<li><strong>App Móvil</strong>: Instala la aplicación Wo Mic en tu celular desde la Play Store o App Store.</li>' +
				'<li><strong>Establecer Conexión</strong>: Abre la app en el móvil, ve a configuración, elige el método (Wi-Fi, USB o Bluetooth) y presiona el botón "Start".</li>' +
				'<li><strong>Vincular con PC</strong>: Abre el cliente en Windows, haz clic en "Connection" -> "Connect" y selecciona el mismo método que en el celular.' +
				'<ul><li><em>Tip por Wi-Fi</em>: Asegúrate de que ambos estén en la misma red e ingresa la IP que muestra la app.</li>' +
				'<li><em>Tip por USB</em>: Requiere tener activada la "Depuración USB" en las opciones de desarrollador de Android.</li></ul></li>' +
				'<li><strong>Configuración Final</strong>: En Windows, ve a <em>Configuración de Sonido</em> y selecciona "WO Mic Device" como tu dispositivo de entrada predeterminado.</li>' +
				'</ul>',
			youtube: 'https://www.youtube.com/watch?v=jbSY5f1Jeu8&t=1s',
			youtubeLead: 'En este video te muestro el proceso paso a paso y pruebas de audio reales.',
			youtubeVideoId: 'jbSY5f1Jeu8',
			youtubeEmbedQs: 'start=1&rel=0'
		},
		win10: {
			meta: 'Tutorial · Windows · Instalación',
			title: 'Cómo instalar Windows 10 por tu cuenta',
			bodyHtml:
				'<p>Guía en video para preparar el medio de instalación (USB), ajustes de BIOS/UEFI, particiones y el asistente paso a paso.</p>' +
				'<p>Autor del tutorial en Odysee: Capitán Tutos. ' +
				'<a href="https://odysee.com/@Capit%C3%A1nTutos:2/instalacion-windows10:a" target="_blank" rel="noopener noreferrer">Abrir en Odysee</a>.</p>',
			embedIframeSrc: 'https://odysee.com/$/embed/instalacion-windows10:a',
			embedIframeTitle: 'Instalación Windows 10 (Odysee)',
			videoSectionTitle: 'Video',
			youtubeLead: 'Reproductor embebido (Odysee), mismo contenido que el enlace de arriba.'
		}
	};

	function fillPopupYouTube(d, isBlog) {
		var $ytBlock = $('#project-popup-youtube-block');
		var $ytLead = $('#project-popup-youtube-lead');
		var $ytWrap = $('#project-popup-video-wrap');
		var $ytFrame = $('#project-popup-youtube-iframe');
		var $ytH3 = $ytBlock.find('.project-popup-h3').first();
		var showVideo = isBlog
			? !!(d.youtube || d.youtubeVideoId || d.embedIframeSrc)
			: (!d.repo && (d.youtube || d.youtubeVideoId || d.embedIframeSrc));
		if (showVideo) {
			$ytH3.text(d.videoSectionTitle || 'YouTube');
			var leadText = d.youtubeLead != null ? d.youtubeLead : 'Más detalle en mi canal de YouTube.';
			$ytLead.text(leadText);
			$ytLead.css('display', String(leadText).trim() !== '' ? '' : 'none');
			if (d.youtubeVideoId) {
				$ytFrame.attr('title', 'Video de YouTube').attr('src', buildYoutubeEmbedSrc(d.youtubeVideoId, d.youtubeEmbedQs));
				$ytWrap.prop('hidden', false);
			} else if (d.embedIframeSrc) {
				$ytFrame.attr('title', d.embedIframeTitle || 'Video embebido').attr('src', d.embedIframeSrc);
				$ytWrap.prop('hidden', false);
			} else {
				$ytFrame.attr('src', '').attr('title', 'Reproductor de video');
				$ytWrap.prop('hidden', true);
			}
			$ytBlock.show();
		} else {
			$ytFrame.attr('src', '').attr('title', 'Reproductor de video');
			$ytWrap.prop('hidden', true);
			$ytH3.text('YouTube');
			$ytLead.css('display', '');
			$ytBlock.hide();
		}
	}

	function openProjectPopup(key) {
		var d = CV_PROJECTS[key];
		if (!d) {
			return;
		}
		$('#project-popup-body').removeClass('popup-mode-blog');
		$('#project-popup-blog-block').attr('hidden', true);
		$('.js-popup-project-only').show();

		$('#project-popup-kicker').text(d.kicker || '');
		$('#project-popup-heading').text(d.title);
		$('#project-popup-problema').text(d.problema);
		$('#project-popup-solucion').text(d.solucion);
		var $ul = $('#project-popup-tech').empty();
		(d.tech || []).forEach(function (t) {
			$ul.append($('<li></li>').text(t));
		});

		var $repoBlock = $('#project-popup-repo-block');
		var $repo = $('#project-popup-repo');
		if (d.repo) {
			var hrefRepo = d.repo.indexOf('http') === 0 ? d.repo : 'https://' + d.repo;
			var labelRepo = hrefRepo.replace(/^https?:\/\//, '');
			$repo.attr('href', hrefRepo).text(labelRepo);
			$repoBlock.show();
		} else {
			$repoBlock.hide();
		}

		fillPopupYouTube(d, false);

		$('#project-popup').addClass('is-open').attr('aria-hidden', 'false');
		$('body').addClass('project-popup-locked');
	}

	function openBlogPopup(key) {
		var b = CV_BLOG[key];
		if (!b) {
			return;
		}
		$('#project-popup-body').addClass('popup-mode-blog');
		$('.js-popup-project-only').hide();
		$('#project-popup-blog-block').removeAttr('hidden');
		$('#project-popup-kicker').text(b.meta || '');
		$('#project-popup-heading').text(b.title);
		if (b.bodyHtml) {
			$('#project-popup-blog-body').html(b.bodyHtml);
		} else {
			$('#project-popup-blog-body').text(b.body || '');
		}
		fillPopupYouTube(
			{
				youtube: b.youtube,
				youtubeLead: b.youtubeLead,
				youtubeVideoId: b.youtubeVideoId,
				youtubeEmbedQs: b.youtubeEmbedQs,
				embedIframeSrc: b.embedIframeSrc,
				embedIframeTitle: b.embedIframeTitle,
				videoSectionTitle: b.videoSectionTitle,
				repo: null
			},
			true
		);

		$('#project-popup').addClass('is-open').attr('aria-hidden', 'false');
		$('body').addClass('project-popup-locked');
	}

	function closeProjectPopup() {
		$('#project-popup').removeClass('is-open').attr('aria-hidden', 'true');
		$('body').removeClass('project-popup-locked');
		$('#project-popup-youtube-iframe').attr('src', '');
		$('#project-popup-video-wrap').prop('hidden', true);
		$('#project-popup-body').removeClass('popup-mode-blog');
		$('#project-popup-blog-block').attr('hidden', true);
		$('.js-popup-project-only').show();
		$('#project-popup-blog-body').empty();
	}

	$(document).on('click', '.js-project-card', function (e) {
		e.preventDefault();
		openProjectPopup($(this).data('project'));
	});

	$('.works-projects').on('keydown', '.js-project-card', function (e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openProjectPopup($(this).data('project'));
		}
	});

	$(document).on('click', '.js-blog-card', function (e) {
		e.preventDefault();
		openBlogPopup($(this).data('blog'));
	});

	$('.blog-cards-grid').on('keydown', '.js-blog-card', function (e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openBlogPopup($(this).data('blog'));
		}
	});

	$('#project-popup-backdrop, #project-popup-close').on('click', function () {
		closeProjectPopup();
	});

	$(document).on('keydown', function (e) {
		if (e.key === 'Escape' && $('#project-popup').hasClass('is-open')) {
			closeProjectPopup();
		}
	});

});


/*
	Google Map Options
*/

function initMap() {
	var myLatlng = new google.maps.LatLng(40.773328,-73.960088); // <- Your latitude and longitude
	var styles = [
	{
		"featureType": "water",
		"stylers": [{
			"color": "#d8dee9"
		},
		{
			"visibility": "on"
		}]
	},
	{
		"featureType": "landscape",
		"stylers": [{
			"color": "#eeeeee"
		}]
	}]

	var mapOptions = {
		zoom: 14,
		center: myLatlng,
		mapTypeControl: false,
		disableDefaultUI: true,
		zoomControl: true,
		scrollwheel: false,
		styles: styles
	}

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'We are here!'
	});
}
