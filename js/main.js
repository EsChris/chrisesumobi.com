/*
Template Name: Metabird – Responsive Bootstrap Personal Template
Author: Metablox
Version: 1.1.2
Created: February 2020
File Description: Main JS file of the template
*/

! function($) {
    "use strict";

    // Hide down arrow when scrolling
    $(window).on('scroll', function() {
        $(".scroll-down").css("opacity", 1 - $(window).scrollTop() / 500);
    });

    // Change class of main navigation when scrolling
    $(window).on('scroll', function() {
        if ($(document).scrollTop() > 100) {
            $(".fixed-top").addClass("shrink");
        } else {
            $(".fixed-top").removeClass("shrink");
        }
    });
    
    // Progress bar animation
    $(".progress .progress-bar").waypoint(function() {
        $('.progress .progress-bar').css("width",function() {
            return $(this).attr("aria-valuenow") + "%";
        });
    }, { offset: '100%'});

  // Section fade in animations
    $('.animate__animated').each(function() {
        var section = $(this);
        section.css('opacity', 0);
        section.waypoint(function() {
            section.addClass("animate__fadeInUp");
        }, { offset: '70%'});
    });

    // Mobile navigation toggle
    $('.navbar-toggler.open').click(function() {
        $('body').addClass('mm-menu-open');
        $('#main-menu').animate({
            left: '0'
        }, 300);
        $('body').animate({
            left: '300px'
        }, 300);
    });
    $('.navbar-toggler.close').click(function() {
        $('body').removeClass('mm-menu-open');
        $('#main-menu').animate({
            left: '-300px'
        }, 300);
        $('body').animate({
            left: '0'
        }, 300);
    });

    // Smooth scrolling
    $(document).on('click', 'a[href^="#"]', function(event) {
        event.preventDefault();

        var offsetY;
        var navHeight = $('.navbar.fixed-top').outerHeight();

        $(window).on('resize', function() {
            if($(window).width() <= 576) {
                offsetY = navHeight -1
            } else if($(window).width() >= 576) {
                offsetY = 20
            } 
        }).resize();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - offsetY
        }, 1000);
    });

    // Navigation links highlighting
    var sections = $('section')
    var nav = $('nav')

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - 200,
            bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
            }
        });
    });

    // Lightbox options
    lightbox.option({
        'disableScrolling': true,
        'albumLabel': "Project %1 of %2",
        'positionFromTop': 100
    })

    // Back to top button
    var backToTopButton = $('.back-to-top');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            backToTopButton.fadeIn();
        } else {
            backToTopButton.fadeOut();
        }
    });

    backToTopButton.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '100');
    });

    // Typed
    var typed = new Typed('.typed', {
        stringsElement: '.typed-strings',
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 3000,
        smartBackspace: true,
        loop: true
    });

    // Testimonials
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ['', ''],
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    $('#customers-testimonials').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 30,
        autoplay: true,
        dots: true,
        nav: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1170: {
                items: 1
            }
        }
    });

    // Shuffle
    var Shuffle = window.Shuffle;

    class PortfolioShuffle {
        constructor(element) {
            this.element = element;
            this.shuffle = new Shuffle(element, {
                itemSelector: ".project-item",
            });

            this.addShuffleEventListeners();
            this._activeFilters = [];
            this.addFilterButtons();
        }

        addShuffleEventListeners() {
            this.shuffle.on(Shuffle.EventType.LAYOUT, data => {
                console.log("layout. data:", data);
            });
            this.shuffle.on(Shuffle.EventType.REMOVED, data => {
                console.log("removed. data:", data);
            });
        }

        addFilterButtons() {
            const options = document.querySelector(".filter-options");
            if (!options) {
                return;
            }

            const filterButtons = Array.from(options.children);
            const onClick = this._handleFilterClick.bind(this);
            filterButtons.forEach(button => {
                button.addEventListener("click", onClick, false);
            });
        }

        _handleFilterClick(evt) {
            const btn = evt.currentTarget;
            const isActive = btn.classList.contains("active");
            const btnGroup = btn.getAttribute("data-group");

            this._removeActiveClassFromChildren(btn.parentNode);

            let filterGroup;
            if (isActive) {
                btn.classList.remove("active");
                filterGroup = Shuffle.ALL_ITEMS;
            } else {
                btn.classList.add("active");
                filterGroup = btnGroup;
            }

            this.shuffle.filter(filterGroup);
        }

        _removeActiveClassFromChildren(parent) {
            const {
                children
            } = parent;
            for (let i = children.length - 1; i >= 0; i--) {
                children[i].classList.remove("active");
            }
        }

        _handleSortChange(evt) {
            const buttons = Array.from(evt.currentTarget.children);
            buttons.forEach(button => {
                if (button.querySelector("input").value === evt.target.value) {
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                }
            });
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        window.demo = new PortfolioShuffle(
            document.getElementById("project-grid")
        );
    });

}(window.jQuery);
