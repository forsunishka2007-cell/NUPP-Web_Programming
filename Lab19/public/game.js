$(document).ready(function() {
    let currentCategory = 'animal';
    let targetPath = '';

    function initGame() {
        $('#game-grid, #target-container').animate({ opacity: 0 }, 300, function() {
            currentCategory = $('#category-select').val();
            const grid = $('#game-grid');
            grid.empty();

            let nums = Array.from({ length: 50 }, (_, i) => i + 1);
            nums.sort(() => Math.random() - 0.5);

            let selected = nums.slice(0, 25);
            let paths = [];

            selected.forEach(n => {
                const p = `/assets/${currentCategory}/${n}.jpg`;
                paths.push(p);
                grid.append(`<div class="grid-cell"><img src="${p}" data-path="${p}"></div>`);
            });

            targetPath = paths[Math.floor(Math.random() * 25)];
            $('#draggable-img').attr('src', targetPath);

            $('#game-grid, #target-container').animate({ opacity: 1 }, 500);
            setupInteractions();
        });
    }

    function setupInteractions() {
        $('#draggable-img').draggable({
            revert: "invalid",
            helper: "clone",
            containment: "document",
            cursorAt: { top: 50, left: 50 }, 
            start: function(event, ui) {
                $(ui.helper).css({
                    "z-index": 1000,
                    "box-shadow": "0 0 30px #ff00ff",
                    "pointer-events": "none"
                });
            }
        });

        $('.grid-cell').droppable({
            accept: "#draggable-img",
            hoverClass: "ui-state-hover",
            drop: function(event, ui) {
                const droppedOn = $(this).find('img').attr('data-path');

                if (droppedOn === targetPath) {
                    $(this).css("box-shadow", "0 0 40px #39ff14");
                    setTimeout(() => {
                        alert("ВІТАЄМО! Ви знайшли збіг!");
                        initGame();
                    }, 300);
                }
            }
        });
    }

    $('#category-select').change(initGame);
    $('#restart-btn').click(initGame);

    initGame();
});