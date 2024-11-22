
console.log("Origami Client-side Modifications Injected!");
document.title = "Origami Server";

var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = 'favicon.ico';

function isDarkOn() {
    var darkOnStr = Cookies.get('darkTheme');
    var darkOn = (darkOnStr == 'true');
    return darkOn
}
window.test = false;
window.startedLoadMode = false;
window.loadedModes = {
    'lab': false,
    'labEgpt': false,
    'blocks': false,
    'xmas': false
};
function checkLabel() {
    var darkOn = isDarkOn();
    $('#darkBtn').html("DARK THEME " + (darkOn == true ? "ON" : "OFF"));
    if (darkOn == false) {
        if (window.xmasOn === true) {
            $("#outer_grid").css("background", "#D6F0F5 url(/newpaperio/images/paperXmas.png)");
            $("#grid").css("background", "#D6F0F5 url(/newpaperio/images/xmasSnow1.png)")
        } else {
            $("#outer_grid").css("background", "#f0fafc");
            $("#grid").css("background-color", "#dff3f7")
        }
        $("#grid").css("border", "#80969e 20px solid");
        $("#p1_best").css("color", "#000");
        $("#the_game").css("box-shadow", "#80969e");
        $("#the_game").css("-webkit-box-shadow", "#80969e");
        $("#the_game").removeClass("dark")
    } else {
        if (window.xmasOn === true) {
            $("#outer_grid").css("background", "#4F5E62 url(/newpaperio/images/paperXmas.png)");
            $("#grid").css("background", "#4F5E62 url(/newpaperio/images/xmasSnow.png)")
        } else {
            $("#outer_grid").css("background", "#333E3E");
            $("#grid").css("background-color", "#4F5E62")
        }
        $("#grid").css("border", "#242B2D 20px solid");
        $("#p1_best").css("color", "#ffffff");
        $("#the_game").css("box-shadow", "#1D2325");
        $("#the_game").css("-webkit-box-shadow", "#1D2325");
        $("#the_game").addClass("dark")
    }
}
window.checkTheme = checkLabel;
checkLabel();
window.lastTimePress = new Date();
function timePressCheck() {
    let now = new Date();
    let time = Math.floor((now.getTime() - window.lastTimePress.getTime()));
    return (time >= (140 * 100 / game_speed))
}
function timePressSet() {
    let now = new Date();
    window.lastTimePress.setTime(now.getTime())
}
$(document).keydown(function(e) {
    var who = 'p1';
    if (game_mode != 'mini_papervsblocks') {
        if (window.timePressCheck() == true) {
            window.timePressSet()
        } else {
            return
        }
        if (window.reverse_control == true) {
            if (e.keyCode === 68 || e.keyCode == 39) {
                if (window[who + '_d'] != 3)
                    window[who + '_d'] = 1
            } else if (e.keyCode === 65 || e.keyCode == 37) {
                if (window[who + '_d'] != 1)
                    window[who + '_d'] = 3
            } else if (e.keyCode === 87 || e.keyCode == 38) {
                if (window[who + '_d'] != 2)
                    window[who + '_d'] = 4
            } else if (e.keyCode === 40 || e.keyCode == 83) {
                if (window[who + '_d'] != 4)
                    window[who + '_d'] = 2
            }
        } else {
            if (e.keyCode === 68 || e.keyCode == 39) {
                if (window[who + '_d'] != 1)
                    window[who + '_d'] = 3
            } else if (e.keyCode === 65 || e.keyCode == 37) {
                if (window[who + '_d'] != 3)
                    window[who + '_d'] = 1
            } else if (e.keyCode === 87 || e.keyCode == 38) {
                if (window[who + '_d'] != 4)
                    window[who + '_d'] = 2
            } else if (e.keyCode === 40 || e.keyCode == 83) {
                if (window[who + '_d'] != 2)
                    window[who + '_d'] = 4
            }
        }
        return
    } else {
        if (window.lastPressCovered == e.keyCode) {
            return
        }
        if (e.keyCode === 68 || e.keyCode == 39) {
            window[who + '_dB'] = 3
        } else if (e.keyCode === 65 || e.keyCode == 37) {
            window[who + '_dB'] = 1
        }
        window.lastPressCovered = e.keyCode
    }
});
var ads_scheme = 1;
ts = +Cookies.get('paperio_topscore');
paperio_challenges = Cookies.get('paperio_challenges');
if (!paperio_challenges) {
    paperio_challenges = {}
} else {
    paperio_challenges = JSON.parse(paperio_challenges)
}
if (isNaN(ts)) {
    ts = 0
}
var top_sco_re = ts;
var my_sco_re = 0;
var game_timer = 0;
var game_timer_c = 0;
var killed_other = 0;
var killed_total = 0;
var p0_x = 0;
var p0_y = 0;
var p0_d = 0;
var p0_dl = 0;
var p0_dm = 0;
var p0_mv = [];
var p0_co = [0, 0, 0, 0];
var p1_x = 0;
var p1_y = 0;
var p1_d = 0;
var p1_dl = 0;
var p1_dm = 0;
var p1_mv = [];
var p1_co = [0, 0, 0, 0];
var p2_x = 0;
var p2_y = 0;
var p2_d = 0;
var p2_dl = 0;
var p2_dm = 0;
var p2_mv = [];
var p2_co = [0, 0, 0, 0];
var p3_x = 0;
var p3_y = 0;
var p3_d = 0;
var p3_dl = 0;
var p3_dm = 0;
var p3_mv = [];
var p3_co = [0, 0, 0, 0];
var p4_x = 0;
var p4_y = 0;
var p4_d = 0;
var p4_dl = 0;
var p4_dm = 0;
var p4_mv = [];
var p4_co = [0, 0, 0, 0];
var p5_x = 0;
var p5_y = 0;
var p5_d = 0;
var p5_dl = 0;
var p5_dm = 0;
var p5_mv = [];
var p5_co = [0, 0, 0, 0];
var p6_x = 0;
var p6_y = 0;
var p6_d = 0;
var p6_dl = 0;
var p6_dm = 0;
var p6_mv = [];
var p6_co = [0, 0, 0, 0];
var p7_x = 0;
var p7_y = 0;
var p7_d = 0;
var p7_dl = 0;
var p7_dm = 0;
var p7_mv = [];
var p7_co = [0, 0, 0, 0];
var p8_x = 0;
var p8_y = 0;
var p8_d = 0;
var p8_dl = 0;
var p8_dm = 0;
var p8_mv = [];
var p8_co = [0, 0, 0, 0];
var p9_x = 0;
var p9_y = 0;
var p9_d = 0;
var p9_dl = 0;
var p9_dm = 0;
var p9_mv = [];
var p9_co = [0, 0, 0, 0];
var names = [];
$('#pre_game').show();
var grid_width = 90;
var grid_height = 70;
for (i = 1; i <= 21; i++) {
    if (paperio_challenges['c' + i]) {
        $('#challenge_block_' + i).addClass('completed')
    }
}
$('#challenge_status .progress').html($('#pre_game .challenges_list .block.completed').length + '/' + $('#pre_game .challenges_list .block').length);
$('#challenge_status .bar .inner').css({
    'width': $('#pre_game .challenges_list .block.completed').length / $('#pre_game .challenges_list .block').length * 100 + '%'
});
$('#paperio #pre_game input').css({
    'left': -1000
}).show().animate({
    'left': 0
}, 300);
$('#paperio_p1').on('keyup', function(e) {
    if (e.keyCode == 13 && $('#paperio #pre_game .button.play').is(':visible')) {
        $('#paperio #pre_game .button.play').trigger('click')
    }
});
initObstacles();
function spawn(p, n) {
    if ($('#' + p + '_cursor').length)
        return;
    if ($('#paperio_p1').val() == 'PIZZA8003' && p != 'p1')
        return;
    if (pause) {
        window.setTimeout(spawn, 1000, p, n);
        return;
        return
    }
    while (!n && p != 'p1') {
        n = names[Math.floor(Math.random() * names.length)];
        if ($('#playcursors b[data-playername=\'' + n + '\']').length > 0) {
            n = ''
        }
    }
    spawn_y = Math.floor(Math.random() * (grid_height - 8 * 2)) + 8;
    spawn_x = Math.floor(Math.random() * (grid_width - 8 * 2)) + 8;
    while (window['obstacles'][spawn_x][spawn_y] == 1 || window['obstacles'][spawn_x][spawn_y] == 2) {
        spawn_y = Math.floor(Math.random() * (grid_height - 8 * 2)) + 8;
        spawn_x = Math.floor(Math.random() * (grid_width - 8 * 2)) + 8
    }
    if (obstaclesOn == true) {
        while (window['obstacles'][spawn_x][spawn_y] == 1 || window['obstacles'][spawn_x][spawn_y] == 2) {
            spawn_y = Math.floor(Math.random() * (grid_height - 8 * 2)) + 8;
            spawn_x = Math.floor(Math.random() * (grid_width - 8 * 2)) + 8
        }
    }
    for (i = spawn_x - 8; i < spawn_x + 8; i++) {
        for (j = spawn_y - 8; j < spawn_y + 8; j++) {
            if (playground[i][j] || playpaths[i][j]) {
                spawndelay = 200;
                if (p == 'p1') {
                    spawndelay = 0
                }
                window.setTimeout(spawn, spawndelay, p, n);
                return
            }
        }
    }
    window[p + '_y'] = spawn_y;
    window[p + '_x'] = spawn_x;
    window[p + '_d'] = 0;
    window[p + '_dl'] = 0;
    window[p + '_dm'] = 0;
    window[p + '_mv'] = [];
    if (p == 'p1') {
        $('<b id="' + p + '_cursor"></b>').css({
            'top': window[p + '_y'] * 30,
            'left': window[p + '_x'] * 30
        }).attr('data-playername', n).appendTo('#playcursors').hide();
        var cls = Cookies.get('skin');
        if (cls == undefined || typeof cls == 'undefined') {
            Cookies.set('skin', 'skin_00', {
                expires: 30
            })
        }
        window['skin' + p] = cls;
        $('p1_cursor').addClass(cls);
        var skin = window['skinp1'];
        if (skin == 'skin_00' || skin == 'undefined' || typeof skin == 'undefined') {
            skin = 'col1'
        }
        $('#p1_status').addClass("score_p1 score " + skin)
    } else {
        $('<b id="' + p + '_cursor"></b>').css({
            'top': window[p + '_y'] * 30,
            'left': window[p + '_x'] * 30
        }).attr('data-playername', n).appendTo('#playcursors')
    }
    window[p + '_co'] = [window[p + '_x'], window[p + '_y'], window[p + '_x'], window[p + '_y']];
    for (cx = window[p + '_x'] - 1; cx <= window[p + '_x'] + 1; cx++) {
        for (cy = window[p + '_y'] - 1; cy <= window[p + '_y'] + 1; cy++) {
            playground[cx][cy] = p
        }
    }
    redraw_pg();
    game_move(p, 1);
    if (p == 'p1') {
        $('#pre_game').hide();
        $('#left, #right, #bottom, #share, #links, #message, #game_over, #darktheme, #cmpPersistentLink').hide();
        $('#the_game').show()
    }
    if (p == 'p1') {
        changeSkin('p1', 0, 1);
        $('#p1_cursor').css({
            'top': window[p + '_y'] * 30 - 500,
            'left': window[p + '_x'] * 30
        }).attr('data-playername', n).show().animate({
            'top': window[p + '_y'] * 30
        }, 1000 * 100 / game_speed, 'easeOutBounce');
        spawndelay = 1200 * 100 / game_speed
    } else {
        changeSkin(p, 0, 1);
        spawndelay = 500 * 100 / game_speed
    }
    window.goSide = Math.floor(Math.random() * 4) + 1;
    window.setTimeout(p + '_d = window.goSide; ' + p + '_dl = ' + p + '_d; game_move(\'' + p + '\', 1); changeSkin(\'' + p + '\', 0, window["p1"+"_dl"]);', spawndelay)
}
function changeSkin(p, now, to) {
    var d = now;
    var d2 = to;
    if (game_mode == 'mini_papervsblocks') {
        return
    }
    if (p == 'p1') {
        if (d != d2) {
            var cls = Cookies.get('skin');
            if (cls == "skin_00") {
                cls = "col1"
            }
            $('#p1_cursor').removeClass("turned_1");
            $('#p1_cursor').removeClass("turned_2");
            $('#p1_cursor').removeClass("turned_3");
            $('#p1_cursor').removeClass("turned_4");
            if (isDarkOn() == true)
                $('#p1_cursor').addClass("turned_" + d2 + " " + cls + " unit " + p + " dark");
            else
                $('#p1_cursor').addClass("turned_" + d2 + " " + cls + " unit " + p)
        }
    } else {
        if (d != d2) {
            var cls = window['skin' + p];
            if (cls == "undefined" || typeof cls == 'undefined') {
                cls = ""
            }
            var str = "#" + p + "_cursor";
            $(str).removeClass("turned_1");
            $(str).removeClass("turned_2");
            $(str).removeClass("turned_3");
            $(str).removeClass("turned_4");
            if (isDarkOn() == true)
                $(str).addClass("turned_" + d2 + " " + cls + " unit " + p + " dark");
            else
                $(str).addClass("turned_" + d2 + " " + cls + " unit " + p)
        }
    }
}
function redraw_pg() {
    ht = '';
    scores = [];
    top_score = 0;
    for (i = 0; i < grid_width; i++) {
        l = '';
        h = 0;
        var skin = " " + window['skin' + l];
        for (j = 0; j < grid_height; j++) {
            p = playground[i][j];
            if (p) {
                if (!scores[p]) {
                    scores[p] = 1
                } else {
                    scores[p]++
                }
                if (scores[p] > top_score) {
                    top_score = scores[p]
                }
            }
            if (p != l && h > 0) {
                skin = " " + window['skin' + l];
                if (skin == ' skin_00') {
                    skin = ' col1'
                }
                if (typeof skin == 'undefined' || skin == 'undefined' || skin == ' undefined') {
                    skin = ' col1'
                }
                if (l != '') {
                    ht += '<b class="' + skin + ' owned ' + l + '_owned" style="top:' + ((j - h) * 30) + 'px; left:' + (i * 30) + 'px; height:' + (h * 30) + 'px"></b>'
                }
                h = 0
            }
            l = p;
            if (p != '') {
                h++
            }
        }
        if (h > 0) {
            if (l != '') {
                skin = " " + window['skin' + l];
                if (typeof skin == 'undefined' || skin == 'undefined' || skin == ' undefined') {
                    skin = ' col1'
                }
                if (skin == ' skin_00') {
                    skin = ' col1'
                }
                ht += '<b class="' + skin + ' owned ' + l + '_owned" style="top:' + ((j - h) * 30) + 'px; left:' + (i * 30) + 'px; height:' + (h * 30) + 'px"></b>'
            }
        }
    }
    $('#playground').removeClass('has100pct').html(ht);
    $('#scores').empty();
    for (var k in scores) {
        if (scores.hasOwnProperty(k)) {
            s = scores[k];
            p = s / (grid_width * grid_height) * 100;
            if (k == 'p1') {
                my_sco_re = p;
                switch (game_challenge) {
                case 1:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 15 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 15%');
                    break;
                case 2:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 15 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 15%');
                    break;
                case 3:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 15 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 15%');
                    break;
                case 4:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(killed_total / 9 * 260)
                    });
                    $('#p1_best').html(killed_total + ' / ' + 8);
                    break;
                case 5:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(killed_other / 10 * 260)
                    });
                    $('#p1_best').html(killed_other + ' / 10');
                    break;
                case 6:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 25 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 25%');
                    break;
                case 7:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 50 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 50%');
                    break;
                case 8:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(killed_total / 9 * 260)
                    });
                    $('#p1_best').html(killed_total + ' / ' + 8);
                    break;
                case 9:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 25 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 25%');
                    break;
                case 10:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 25 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 25%');
                    break;
                case 11:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(killed_other / 30 * 260)
                    });
                    $('#p1_best').html(killed_other + ' / 30');
                    break;
                case 12:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 50 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 50%');
                    break;
                case 13:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(killed_other / 75 * 260)
                    });
                    $('#p1_best').html(killed_other + ' / 75');
                    break;
                case 14:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 50 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 50%');
                    break;
                case 15:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 75 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 75%');
                    break;
                case 16:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 100 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 100%');
                    break;
                case 17:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 75 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 75%');
                    break;
                case 18:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 10 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 10%');
                    break;
                case 19:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 25 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 25%');
                    break;
                case 20:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 50 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 50%');
                    break;
                case 21:
                    $('#p1_status').html('').css({
                        'padding-right': 0,
                        'width': Math.round(p / 75 * 260)
                    });
                    $('#p1_best').html(p.toFixed(2) + '% / 75%');
                    break;
                default:
                    $('#p1_status').html(p.toFixed(2) + '%').css({
                        'padding-right': '',
                        'width': 60 + Math.round(p * 2)
                    });
                    break
                }
            }
            p2 = s / top_score * 100;
            var skin = " " + window['skin' + k];
            if (typeof skin == 'undefined' || skin == 'undefined' || skin == ' undefined') {
                skin = ' '
            }
            if (skin == ' skin_00' || skin == ' undefined' || typeof skin == 'undefined') {
                skin = ' col1'
            }
            $('#scores').append('<div class="score_' + k + ' score' + skin + '" data-player="' + k.replace('p', '') + '" data-sorter="' + s + '" data-score="' + p + '" style="width: ' + (60 + Math.round(p2 * 2)) + 'px;"> - ' + (p.toFixed(2) + '%') + ' ' + ($('#' + k + '_cursor').attr('data-playername').replace(/</g, "&lt;").replace(/>/g, "&gt;")) + '</div>')
        }
    }
    $('#scores').find('div').sort(function(a, b) {
        return +b.dataset.sorter - +a.dataset.sorter
    }).appendTo('#scores');
    $('#playcursors b.crown').removeClass('crown');
    $('#p' + $('#scores div').first().attr('data-player') + '_cursor').addClass('crown');
    grid_scale = 1;
    if (my_sco_re >= 50) {
        grid_scale = 29 / 30
    }
    if (my_sco_re >= 55) {
        grid_scale = 28 / 30
    }
    if (my_sco_re >= 60) {
        grid_scale = 27 / 30
    }
    if (my_sco_re >= 65) {
        grid_scale = 26 / 30
    }
    if (my_sco_re >= 70) {
        grid_scale = 25 / 30
    }
    if (my_sco_re >= 75) {
        grid_scale = 24 / 30
    }
    if (my_sco_re >= 80) {
        grid_scale = 23 / 30
    }
    if (my_sco_re >= 85) {
        grid_scale = 22 / 30
    }
    if (my_sco_re >= 90) {
        grid_scale = 21 / 30
    }
    if (my_sco_re >= 95) {
        grid_scale = 20 / 30
    }
    checkResults()
}
function checkResults() {
    if (game_challenge == 0) {
        if (my_sco_re == 100) {
            $('#grid').css('transform', 'scale(' + grid_scale + ')');
            Cookies.set('paperio_topscore', 100, {
                expires: 30
            });
            pause = true;
            $('#playground,#outer_grid').addClass('has100pct');
            $('#playcursors').empty();
            $('#fireworks').addClass('on').css({
                'z-index': 100,
                'position': 'relative'
            }).show();
            fworks.firework();
            fworks.firework();
            fworks.firework();
            $(document).on('click', function() {
                $('#fireworks').removeClass('on').css({
                    'z-index': '',
                    'position': ''
                }).hide();
                if (ads_scheme == 1) {
                    game_is_over()
                } else {
                    afg_do()
                }
            })
        }
    } else {
        chalcomplete = false;
        if (game_challenge == 1 && my_sco_re >= 15)
            chalcomplete = true;
        if (game_challenge == 2 && my_sco_re >= 15)
            chalcomplete = true;
        if (game_challenge == 3 && my_sco_re >= 15)
            chalcomplete = true;
        if (game_challenge == 4 && killed_total >= 8)
            chalcomplete = true;
        if (game_challenge == 5 && killed_other >= 10)
            chalcomplete = true;
        if (game_challenge == 6 && my_sco_re >= 25)
            chalcomplete = true;
        if (game_challenge == 7 && my_sco_re >= 50)
            chalcomplete = true;
        if (game_challenge == 8 && killed_total >= 8)
            chalcomplete = true;
        if (game_challenge == 9 && my_sco_re >= 25)
            chalcomplete = true;
        if (game_challenge == 10 && my_sco_re >= 25)
            chalcomplete = true;
        if (game_challenge == 11 && killed_other >= 30)
            chalcomplete = true;
        if (game_challenge == 12 && my_sco_re >= 50)
            chalcomplete = true;
        if (game_challenge == 13 && killed_other >= 75)
            chalcomplete = true;
        if (game_challenge == 14 && my_sco_re >= 50)
            chalcomplete = true;
        if (game_challenge == 15 && my_sco_re >= 75)
            chalcomplete = true;
        if (game_challenge == 16 && my_sco_re >= 100)
            chalcomplete = true;
        if (game_challenge == 17 && my_sco_re >= 75)
            chalcomplete = true;
        if (game_challenge == 18 && my_sco_re >= 10)
            chalcomplete = true;
        if (game_challenge == 19 && my_sco_re >= 25)
            chalcomplete = true;
        if (game_challenge == 20 && my_sco_re >= 50)
            chalcomplete = true;
        if (game_challenge == 21 && my_sco_re >= 75)
            chalcomplete = true;
        if (chalcomplete) {
            $('#grid').css('transform', 'scale(' + grid_scale + ')');
            pause = true;
            $('#playground,#outer_grid').addClass('has100pct');
            $('#playcursors').empty();
            $('#fireworks').addClass('on').css({
                'z-index': 100,
                'position': 'relative'
            }).show();
            fworks.firework();
            fworks.firework();
            fworks.firework();
            $(document).on('click', function() {
                $('#fireworks').removeClass('on').css({
                    'z-index': '',
                    'position': ''
                }).hide();
                game_is_over()
            });
            game_timer_c = +new Date()
        }
    }
}
var filler = [];
var stack = [];
function path_closed(who) {
    co = window[who + '_co'];
    window[who + '_mv'] = [];
    filler = [];
    for (i = co[0] - 1; i <= co[2] + 1; i++) {
        filler[i] = [];
        for (j = co[1] - 1; j <= co[3] + 1; j++) {
            if (i < co[0] || j < co[1] || i > co[2] || j > co[3]) {
                filler[i][j] = 0
            } else if (playground[i][j] == who) {
                filler[i][j] = 1
            } else if (playpaths[i][j] == who) {
                filler[i][j] = 2
            } else {
                filler[i][j] = 0
            }
        }
    }
    stack = [];
    path_fill(co[0] - 1, co[1] - 1);
    while (stack.length > 0) {
        fill = stack.pop();
        if (fill[0] >= co[0] - 1 && fill[1] >= co[1] - 1 && fill[0] <= co[2] + 1 && fill[1] <= co[3] + 1) {
            path_fill(fill[0], fill[1])
        }
    }
    newground = [];
    for (i = co[0]; i <= co[2]; i++) {
        newground[i] = [];
        for (j = co[1]; j <= co[3]; j++) {
            if (playpaths[i][j] == who) {
                playpaths[i][j] = 0
            }
            if (filler[i][j] != 1 && filler[i][j] != 9) {
                playground[i][j] = who;
                newground[i][j] = true
            } else {
                newground[i][j] = false
            }
        }
    }
    ht = '';
    for (i = co[0]; i <= co[2]; i++) {
        l = '';
        h = 0;
        for (j = co[1]; j <= co[3]; j++) {
            p = newground[i][j];
            if (p != l && h > 0) {
                if (l != '') {
                    ht += '<b style="top:' + ((j - h) * 30) + 'px; left:' + (i * 30) + 'px; height:' + (h * 30) + 'px"></b>'
                }
                h = 0
            }
            l = p;
            if (p != '') {
                h++
            }
        }
        if (h > 0) {
            if (l != '') {
                ht += '<b style="top:' + ((j - h) * 30) + 'px; left:' + (i * 30) + 'px; height:' + (h * 30) + 'px"></b>'
            }
        }
    }
    t = +new Date();
    $('#playnews').append('<div id="playnews_' + t + '"></div>');
    $('#playnews_' + t).css({
        'opacity': .6
    }).html(ht).fadeOut(800, 'easeOutQuad', function() {
        $(this).remove()
    });
    window[who + '_co'] = [window[who + '_x'], window[who + '_y'], window[who + '_x'], window[who + '_y']];
    $('#playpaths .' + who + '_drawed').remove();
    redraw_pg()
}
function player_kill(who) {
    if (!$('#' + who + '_cursor').length)
        return;
    if (pause)
        return;
    killed_total++;
    var skin = " score " + window['skin' + who];
    if (window['skin' + who] == 'skin_00') {
        skin = ' score col1'
    }
    if (typeof window['skin' + who] == 'undefined' || window['skin' + who] == 'undefined' || window['skin' + who] == ' undefined') {
        skin = ' score col1'
    }
    $('#playcursors').append('<div id="explode_' + who + '" class="explode"><div class="' + skin + '"></div><div class="' + skin + '"></div><div class="' + skin + '"></div><div class="' + skin + '"></div><div class="' + skin + '"></div><div class="' + skin + '"></div><div class="' + skin + '"></div><div class="' + skin + '"></div><div class="' + skin + '"></div></div>');
    $('#explode_' + who).css({
        'top': $('#' + who + '_cursor').css('top'),
        'left': $('#' + who + '_cursor').css('left')
    });
    $('#' + who + '_cursor').remove();
    $('#explode_' + who + ' div:nth-child(1)').animate({
        'margin-top': -30 - 20 * Math.random(),
        'margin-left': -40 - 20 * Math.random()
    }, 400, 'easeOutCirc');
    $('#explode_' + who + ' div:nth-child(2)').animate({
        'margin-top': -40 - 20 * Math.random(),
        'margin-left': -15 + 20 * Math.random()
    }, 400, 'easeOutCirc');
    $('#explode_' + who + ' div:nth-child(3)').animate({
        'margin-top': -30 - 20 * Math.random(),
        'margin-right': -40 - 20 * Math.random()
    }, 400, 'easeOutCirc');
    $('#explode_' + who + ' div:nth-child(4)').animate({
        'margin-top': -15 + 20 * Math.random(),
        'margin-left': -40 - 20 * Math.random()
    }, 400, 'easeOutCirc');
    $('#explode_' + who + ' div:nth-child(6)').animate({
        'margin-top': -15 + 20 * Math.random(),
        'margin-right': -40 - 20 * Math.random()
    }, 400, 'easeOutCirc');
    $('#explode_' + who + ' div:nth-child(7)').animate({
        'margin-bottom': -30 - 20 * Math.random(),
        'margin-left': -40 - 20 * Math.random()
    }, 400, 'easeOutCirc');
    $('#explode_' + who + ' div:nth-child(8)').animate({
        'margin-bottom': -40 - 20 * Math.random(),
        'margin-left': -15 + 20 * Math.random()
    }, 400, 'easeOutCirc');
    $('#explode_' + who + ' div:nth-child(9)').animate({
        'margin-bottom': -30 - 20 * Math.random(),
        'margin-right': -40 - 20 * Math.random()
    }, 400, 'easeOutCirc');
    $('#explode_' + who).fadeOut(600, function() {
        $(this).remove()
    });
    window[who + '_d'] = 0;
    window[who + '_dl'] = 0;
    for (i = 0; i < grid_width; i++) {
        for (j = 0; j < grid_height; j++) {
            if (playpaths[i][j] == who) {
                playpaths[i][j] = 0
            }
            if (playground[i][j] == who) {
                playground[i][j] = 0
            }
        }
    }
    $('#playpaths .' + who + '_drawed').remove();
    redraw_pg();
    if (who != 'p1') {
        if (game_challenge != 4 && game_challenge != 8)
            window.setTimeout(spawn, 2000 + Math.random() * 6000, who, '')
    }
    if (who == 'p1') {
        pause = true;
        if (ads_scheme == 1) {
            if (game_challenge != 0) {
                game_is_over_chal()
            } else {
                window.setTimeout(game_is_over, 600)
            }
        } else {
            window.setTimeout(afg_do, 600)
        }
    }
}
var game_timer_0 = +new Date();
function game_is_over() {
    if (window.game_mode == 'mini_labclassic') {
        if (typeof game_is_over_lab !== 'undefined') {
            game_is_over_lab()
        } else {
            window.setTimeout(game_is_over, 100);
            return
        }
    }
    $(document).off('click');
    $('#playground,#outer_grid').removeClass('has100pct');
    if (game_challenge == 0) {
        game_is_over_main()
    } else {
        if (game_timer_c != 0) {
            playtime = Math.floor((game_timer_c - game_timer) / 1000)
        } else {
            playtime = 0
        }
        if (!paperio_challenges['c' + game_challenge] || +paperio_challenges['c' + game_challenge] > playtime) {
            paperio_challenges['c' + game_challenge] = playtime;
            Cookies.set('paperio_challenges', paperio_challenges, {
                expires: 999
            })
        }
        $('#challenge_block_' + game_challenge).addClass('completed');
        $('#challenge_status .progress').html($('#pre_game .challenges_list .block.completed').length + '/' + $('#pre_game .challenges_list .block').length);
        $('#challenge_status .bar .inner').css({
            'width': $('#pre_game .challenges_list .block.completed').length / $('#pre_game .challenges_list .block').length * 100 + '%'
        });
        challenge_detail(game_challenge);
        game_is_over_chal()
    }
}
function game_is_over_chal() {
    $('#left').show();
    $('#right').show();
    if (typeof UpdateRightBanner !== "undefined") {
        UpdateRightBanner()
    }
    $('#bottom').show();
    $('#share').show();
    $('#links').show();
    $('#darktheme').show();
    $('#cmpPersistentLink').show();
    $('#pre_game').show();
    $('#the_game').hide()
}
function game_is_over_main() {
    $('#left').show();
    $('#right').show();
    if (typeof UpdateRightBanner !== "undefined") {
        UpdateRightBanner()
    }
    $('#bottom').show();
    $('#share').show();
    $('#links').show();
    $('#darktheme').show();
    $('#cmpPersistentLink').show();
    $('#cpmstar_anchor').show();
    if (game_mode.slice(0, 6) == 'paper2') {
        var paper2_results = window.paper2_results;
        if (game_mode == "paper2_xmas")
            window.paper2_results.reason === 0 && window.ga && window.ga('send', 'event', 'christmas', 'win');
        else
            window.paper2_results.reason === 0 && window.ga && window.ga('send', 'event', 'paper2', 'win');
        var results = window.paper2_results;
        var scores = results.scores;
        console.log("score", scores.accumulator);
        if (typeof Cookies !== 'undefined') {
            let prevValue = parseFloat(Cookies.get('allScores')) || 0;
            prevValue += scores.accumulator;
            Cookies.set('allScores', prevValue, {
                expires: 999
            });
            console.log("did set score prevValue", prevValue, "cookie", Cookies.get('allScores'));
            window.updateProgressBar()
        }
        var modes = {
            ['paper2_classic']: 0,
            ['paper2_small']: 1,
            ['paper2_fastspeed']: 2,
        };
        function getNavigatorLanguage() {
            return ((navigator.languages && navigator.languages[0]) || navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en').substr(0, 2).toUpperCase()
        }
        var cc = '--';
        if (typeof window.country_code !== 'undefined')
            cc = window.country_code;
        var stats = {
            build: results.build || 0,
            player_id: window.playerId || 0,
            lng: getNavigatorLanguage(),
            country_code: cc,
            name: (typeof Cookies !== 'undefined' && Cookies.get('paperio_username')) || '',
            top: results.top || 0,
            percent: Math.round(results.score * 100),
            best: (results.bestPercent && Math.round(results.bestPercent * 10000)) || 0,
            time: Math.round(results.time / 1000),
            kills: results.kills,
            scores: {
                accumulator: (Math.round(scores && scores.accumulator)) || 0,
                kills: (Math.round(scores && scores.kills)) || 0
            },
            reason: results.reason || 0,
            match_mode: modes[window.game_mode]
        };
        function ROTn(text, map) {
            var R = new String();
            var i, j, c, len = map.length;
            for (i = 0; i < text.length; i++) {
                c = text.charAt(i);
                j = map.indexOf(c);
                if (j >= 0) {
                    c = map.charAt((j + len / 2) % len)
                }
                R = R + c
            }
            return R
        }
        function encode2(text) {
            var R = new String();
            R = ROTn(text, "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~");
            return R
        }
        if (!window.paper2.redraw) {
            fetch('/newpaperio/ajax/matches.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: encode2(JSON.stringify(stats))
            })
        }
        if (typeof window.CheckSkinStatus !== 'undefined') {
            window.CheckSkinStatus(Math.round(results.score * 100), Math.round(results.time / 1000), results.kills, window.game_mode)
        }
        playtime = paper2_results.time / 1000;
        playtime_m = Math.floor(playtime / 60);
        if (playtime_m < 10) {
            playtime_m = '0' + playtime_m
        }
        playtime_s = Math.floor(playtime - playtime_m * 60);
        if (playtime_s < 10) {
            playtime_s = '0' + playtime_s
        }
        afg_aftergame();
        new_top = paper2_results.newBest;
        top_sco_re = paper2_results.best;
        my_sco_re = paper2_results.score;
        killed_other = paper2_results.kills
    } else {
        game_timer_2 = +new Date();
        playtime = Math.floor((game_timer_2 - game_timer) / 1000);
        playtime_m = Math.floor(playtime / 60);
        if (playtime_m < 10) {
            playtime_m = '0' + playtime_m
        }
        playtime_s = Math.floor(playtime - playtime_m * 60);
        if (playtime_s < 10) {
            playtime_s = '0' + playtime_s
        }
        afg_aftergame();
        if (my_sco_re > top_sco_re) {
            top_sco_re = my_sco_re;
            new_top = true
        } else {
            new_top = false
        }
        Cookies.set('paperio_topscore', top_sco_re, {
            expires: 30
        });
        if (typeof window.CheckSkinStatus !== 'undefined') {
            window.CheckSkinStatus(0, playtime, killed_other, window.game_mode)
        }
    }
    $('#game_over').empty();
    $('<div class="gameover"></div>').appendTo('#game_over');
    $('<div class="go_sc">YOUR SCORE:</div>').appendTo('#game_over').hide().css({
        'margin-left': -1000
    }).delay(500).show(1).animate({
        'margin-left': -148
    }, 200);
    $('<div class="da_sc">' + my_sco_re.toFixed(2) + '%</div>').appendTo('#game_over').hide().css({
        'zoom': 10
    }).delay(500).show(1).animate({
        'zoom': 1
    }, 300);
    if (new_top) {
        $('<div class="go_bs"><span>NEW </span>BEST SCORE:</div>').appendTo('#game_over').hide().css({
            'margin-left': -1000
        }).delay(1000).show(1).animate({
            'margin-left': -148
        }, 200)
    } else {
        $('<div class="go_bs">BEST SCORE:</div>').appendTo('#game_over').hide().css({
            'margin-left': -1000
        }).delay(1000).show(1).animate({
            'margin-left': -148
        }, 200)
    }
    $('<div class="da_bs">' + top_sco_re.toFixed(2) + '%</div>').appendTo('#game_over').hide().css({
        'zoom': 10
    }).delay(1000).show(1).animate({
        'zoom': 1
    }, 300);
    $('<div class="go_pt">TIME PLAYED:</div>').appendTo('#game_over').hide().css({
        'margin-left': -1000
    }).delay(1500).show(1).animate({
        'margin-left': -148
    }, 200);
    $('<div class="da_pt">' + playtime_m + ':' + playtime_s + '</div>').appendTo('#game_over').hide().css({
        'zoom': 10
    }).delay(1500).show(1).animate({
        'zoom': 1
    }, 300);
    $('<div class="go_pk">PLAYERS KILLED:</div>').appendTo('#game_over').hide().css({
        'margin-left': -1000
    }).delay(2000).show(1).animate({
        'margin-left': -148
    }, 200);
    $('<div class="da_pk">' + killed_other + '</div>').appendTo('#game_over').hide().css({
        'zoom': 10
    }).delay(2000).show(1).animate({
        'zoom': 1
    }, 300);
    if (game_mode.slice(0, 6) == 'paper2') {
        $('<img src="' + paper2_results.image + '" height="130" width="130" style="display:block;margin-left:auto;margin-top:120px;margin-right:auto">').appendTo('#game_over').hide().css({
            'zoom': 10
        }).delay(2000).show(1).animate({
            'zoom': 1
        }, 300);
        window.game_start_reward = function() {
            window.needRewarded = true;
            game_start();
            window.needRewarded = false
        }
        ;
        window.noop = function() {}
        ;
        var share = '';
        share = '<div class="button share" style="display: none; width: 160px;" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=https://paper-io.com/sharescore/' + my_sco_re.toFixed(2) + '/' + playtime_m + ':' + playtime_s + '\',\'sharer\',\'toolbar=0,status=0,width=580,height=325\');">SHARE</div>';
        window.rewardedExist = false;
        window.paper2.rewarded = false;
        window.paper2.redraw = false;
        window.paper2.rewardedFail = '';
        if (game_with_modes) {
            $(share + '<div class="button play" style="display: none" onclick="game_start();">PLAY AGAIN</div><div class="button mode" style="display: none" onclick="document.location.assign(document.location.protocol + \'//\' + document.location.host);">CHANGE GAME MODE</div>').appendTo('#game_over').hide()
        } else {
            $(share + '<div class="button play" style="display: none" onclick="game_start();">PLAY AGAIN</div>').appendTo('#game_over').hide()
        }
    } else {
        if (game_with_modes) {
            $('<div class="button share" style="display: none; width: 160px;" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=https://paper-io.com/sharescore/' + my_sco_re.toFixed(2) + '/' + playtime_m + ':' + playtime_s + '\',\'sharer\',\'toolbar=0,status=0,width=580,height=325\');">SHARE</div><div class="button play" style="display: none" onclick="game_start();">PLAY AGAIN</div><div class="button mode" style="display: none" onclick="document.location.href = document.location.href;">CHANGE GAME MODE</div>').appendTo('#game_over').hide()
        } else {
            $('<div class="button share" style="display: none; width: 160px;" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=https://paper-io.com/sharescore/' + my_sco_re.toFixed(2) + '/' + playtime_m + ':' + playtime_s + '\',\'sharer\',\'toolbar=0,status=0,width=580,height=325\');">SHARE</div><div class="button play" style="display: none" onclick="game_start();">PLAY AGAIN</div>').appendTo('#game_over').hide()
        }
    }
    if (game_with_modes) {
        $('#bottom').css({
            'top': 400
        })
    } else {
        $('#bottom').css({
            'top': 370
        })
    }
    $('#game_over').show();
    $('#left, #right, #bottom, #share, #links, #darktheme, #cmpPersistentLink').show();
    $('#the_game').fadeOut(2200);
    $('#paperio #game_over .button.play').html("PLAY AGAIN");
    if (game_with_modes) {
        $('#paperio #pre_game .button.play').hide().css({
            'right': -1000
        }).delay(2500).show(1).animate({
            'right': 0
        }, 300);
        if ($('body').hasClass('mo')) {
            $('#paperio #game_over .button.play').hide().css({
                'margin-left': 1118,
                'width': 306
            }).delay(2500).show(1).animate({
                'margin-left': -148
            }, 300)
        } else {
            $('#paperio #game_over .button.play').hide().css({
                'margin-left': 1118
            }).delay(2500).show(1).animate({
                'margin-left': -28
            }, 300);
            $('#paperio #game_over .button.share').hide().css({
                'margin-left': -1118
            }).delay(2500).show(1).animate({
                'margin-left': -208
            }, 300);
            $('#paperio #game_over .button.norewardedads').hide().css({
                'margin-left': -1118
            }).delay(2500).show(1).animate({
                'margin-left': -208
            }, 300)
        }
        $('#paperio #game_over .button.mode').hide().css({
            'margin-left': -1118
        }).delay(2500).show(1).animate({
            'margin-left': -158
        }, 300)
    } else {
        $('#paperio #pre_game .button.play').hide().css({
            'right': -1000
        }).delay(2500).show(1).animate({
            'right': 0
        }, 300);
        if ($('body').hasClass('mo')) {
            $('#paperio #game_over .button.play').hide().css({
                'margin-left': 1118,
                'width': 306
            }).delay(2500).show(1).animate({
                'margin-left': -148
            }, 300)
        } else {
            $('#paperio #game_over .button.play').hide().css({
                'margin-left': 1118
            }).delay(2500).show(1).animate({
                'margin-left': -28
            }, 300);
            $('#paperio #game_over .button.share').hide().css({
                'margin-left': -1118
            }).delay(2500).show(1).animate({
                'margin-left': -208
            }, 300);
            $('#paperio #game_over .button.norewardedads').hide().css({
                'margin-left': -1118
            }).delay(2500).show(1).animate({
                'margin-left': -208
            }, 300)
        }
    }
}
function path_fill(x, y) {
    if (filler[x][y] == 0) {
        filler[x][y] = 9;
        stack.push([x, y - 1]);
        stack.push([x + 1, y]);
        stack.push([x, y + 1]);
        stack.push([x - 1, y])
    }
}
var grid_scale = 1;
var prev_scale = 1;
var pause = false;
function initObstacles() {
    window['obstacles'] = [];
    for (i = 0; i <= grid_width; i++) {
        window['obstacles'][i] = [];
        for (j = 0; j <= grid_height; j++) {
            window['obstacles'][i][j] = 0
        }
    }
}
function obstaclesMake() {
    var obstaclesDetails = [];
    for (i = 0; i <= 10; i++) {
        var height = 5;
        var width = 5;
        var addClass = " tree";
        var rand = Math.random() * 10;
        if (rand > 5 && rand <= 7) {
            height = 5;
            width = 5;
            addClass = " trees"
        }
        if (rand > 3 && rand <= 5) {
            height = 4;
            width = 3;
            addClass = " snowman"
        }
        if (rand > 0 && rand <= 3) {
            height = 1;
            width = 2;
            addClass = " present"
        }
        var randomX = Math.floor(2 + Math.random() * (grid_width - 4 - width));
        var randomY = Math.floor(2 + Math.random() * (grid_height - 4 - height));
        while (window['obstacles'][randomX][randomY] == 1 || window['obstacles'][randomX][randomY] == 2) {
            randomX = 2 + Math.random() * (grid_width - 4 - width);
            randomY = 2 + Math.random() * (grid_height - 4 - height);
            randomX = Math.floor(randomX);
            randomY = Math.floor(randomY)
        }
        obstaclesDetails[i] = {
            "height": height,
            "width": width,
            "classAdd": addClass,
            "x": randomX,
            "y": randomY
        };
        ht = '';
        var around = 4;
        for (ox = -around; ox <= width - 1 + around; ox++) {
            for (oy = -around; oy <= height - 1 + around; oy++) {
                if (randomX + ox >= 0 && randomY + oy >= 0 && (window['obstacles'][randomX + ox]) && window['obstacles'][randomX + ox] != 1)
                    window['obstacles'][randomX + ox][randomY + oy] = 2
            }
        }
        for (ox = 0; ox <= width - 1; ox++) {
            for (oy = 0; oy <= height - 1; oy++) {
                if (window['obstacles'][randomX + ox])
                    window['obstacles'][randomX + ox][randomY + oy] = 1
            }
        }
        ht += '<b class="xmas' + addClass + '" style="top:' + (randomY * 30) + 'px; left:' + (randomX * 30) + 'px; height:' + (height * 30) + 'px; width:' + (width * 30) + 'px"></b>';
        $("#obstacles").append(ht)
    }
    window.obstaclesDetails = obstaclesDetails
}
function cleanObstacles() {
    window['obstacles'] = [];
    for (i = 0; i <= grid_width; i++) {
        window['obstacles'][i] = [];
        for (j = 0; j <= grid_height; j++) {
            window['obstacles'][i][j] = 0
        }
    }
    $("#obstacles").html("")
}
function game_move(who, skip_animation) {
    if (pause == true)
        return;
    x = window[who + '_x'];
    y = window[who + '_y'];
    d = window[who + '_d'];
    dl = window[who + '_dl'];
    dm = window[who + '_dm'];
    co = window[who + '_co'];
    mvs = window[who + '_mv'];
    if (d && (who != 'p1' || $('#' + who + '_cursor').attr('data-playername') == '[ BOT ]')) {
        if (playground[x][y] == who) {
            cg = [0, 25, 25, 25, 25];
            cg[d] = 100;
            switch (d) {
            case 1:
                cg[3] = -9999;
                break;
            case 2:
                cg[4] = -9999;
                break;
            case 3:
                cg[1] = -9999;
                break;
            case 4:
                cg[2] = -9999;
                break
            }
            for (i = 1; i <= 4; i++) {
                for (j = 1; j < 20; j++) {
                    switch (i) {
                    case 1:
                        xx = x - j;
                        yy = y;
                        break;
                    case 2:
                        yy = y - j;
                        xx = x;
                        break;
                    case 3:
                        xx = x + j;
                        yy = y;
                        break;
                    case 4:
                        yy = y + j;
                        xx = x;
                        break
                    }
                    if (xx < 0 || yy < 0 || xx > grid_width - 1 || yy > grid_height - 1) {
                        if (j > 1) {
                            cg[i]--
                        } else {
                            cg[i] = -9999
                        }
                    } else {
                        if (playground[x][y] != who && playground[xx][yy] == who) {
                            cg[i]--
                        }
                        if (window.obstaclesOn === true && window['obstacles'][xx] && window['obstacles'][xx][yy] == 1) {
                            if (j > 1) {
                                cg[i]--
                            } else {
                                cg[i] = -9999
                            }
                        }
                        if (playpaths[xx][yy] && playpaths[xx][yy] != who) {
                            if (playpaths[xx][yy] == 'p1') {
                                cg[i] += 30 * (30 - j)
                            } else {
                                cg[i] += 3 * (30 - j)
                            }
                        }
                    }
                }
            }
            cgs = [];
            for (i = 1; i <= 4; i++) {
                for (j = 1; j <= cg[i]; j++) {
                    cgs.push(i)
                }
            }
            if (cgs.length) {
                d = cgs[Math.floor(Math.random() * cgs.length)]
            }
        } else {
            if (($('#scores .score_' + who).attr('data-score') * 1 < 1 + Math.random() * 2 && mvs.length == 0) || (mvs.length > 0 && mvs[0] > 0)) {
                if (mvs.length == 0) {
                    a = Math.random() * 4 + 2;
                    b = Math.random() * 4 + 2;
                    dir = Math.floor(Math.random() * 2) * 2 - 1;
                    da = d;
                    db = da + dir;
                    if (db < 1) {
                        db += 4
                    } else if (db > 4) {
                        db -= 4
                    }
                    dc = db + dir;
                    if (dc < 1) {
                        dc += 4
                    } else if (dc > 4) {
                        dc -= 4
                    }
                    dd = dc + dir;
                    if (dd < 1) {
                        dd += 4
                    } else if (dd > 4) {
                        dd -= 4
                    }
                    for (i = 0; i < a; i++) {
                        mvs.push(da)
                    }
                    for (i = 0; i < b; i++) {
                        mvs.push(db)
                    }
                    for (i = 0; i < a + Math.random() * 2 + 1; i++) {
                        mvs.push(dc)
                    }
                    for (i = 0; i < b + 2; i++) {
                        mvs.push(dd)
                    }
                    mvs.push(-1)
                }
                if (mvs[0] != -1) {
                    d = mvs.shift()
                }
            } else {
                cg = [0, 5, 5, 5, 5];
                cg[d] = 50;
                switch (d) {
                case 1:
                    cg[3] = -9999;
                    break;
                case 2:
                    cg[4] = -9999;
                    break;
                case 3:
                    cg[1] = -9999;
                    break;
                case 4:
                    cg[2] = -9999;
                    break
                }
                for (i = 1; i <= 4; i++) {
                    for (j = 1; j < 20; j++) {
                        switch (i) {
                        case 1:
                            xx = x - j;
                            yy = y;
                            break;
                        case 2:
                            yy = y - j;
                            xx = x;
                            break;
                        case 3:
                            xx = x + j;
                            yy = y;
                            break;
                        case 4:
                            yy = y + j;
                            xx = x;
                            break
                        }
                        if (xx < 0 || yy < 0 || xx > grid_width - 1 || yy > grid_height - 1) {
                            if (j > 1) {
                                cg[i]--
                            } else {
                                cg[i] = -9999
                            }
                        } else {
                            if (playpaths[xx][yy] == who) {
                                if (j > 1) {
                                    cg[i] -= (50 - j)
                                } else {
                                    cg[i] = -9999
                                }
                            }
                            if (window['obstacles'][xx][yy] == 1) {
                                if (j > 1) {
                                    cg[i]--
                                } else {
                                    cg[i] = -9999
                                }
                            }
                            if (playground[x][y] != who && playground[xx][yy] == who) {
                                cg[i] += 10 + j
                            }
                            if (playpaths[xx][yy] && playpaths[xx][yy] != who) {
                                if (playpaths[xx][yy] == 'p1') {
                                    cg[i] += 30 * (30 - j)
                                } else {
                                    cg[i] += 3 * (30 - j)
                                }
                            }
                        }
                    }
                }
                cgs = [];
                for (i = 1; i <= 4; i++) {
                    for (j = 1; j <= cg[i]; j++) {
                        cgs.push(i)
                    }
                }
                if (cgs.length) {
                    d = cgs[Math.floor(Math.random() * cgs.length)]
                }
            }
        }
        window[who + '_d'] = d;
        window[who + '_mvs'] = mvs
    }
    if (d != dl) {
        changeSkin(who, dl, d)
    }
    if (playpaths[x][y] == who) {
        var skin = window['skin' + who];
        if (skin == 'skin_00') {
            skin = 'col1'
        }
        if (typeof skin == 'undefined' || skin == 'undefined' || skin == ' undefined') {
            skin = ' col1 path'
        } else {
            var skin = " path " + skin
        }
        if (d != dl) {
            $('<b class="' + who + skin + ' drawed ' + 'turned_' + d + '' + dl + ' ' + who + '_drawed ' + who + '_turned_' + d + '' + dl + '"></b>').css({
                'top': y * 30,
                'left': x * 30
            }).appendTo('#playpaths')
        } else {
            $('<b class="' + who + skin + ' drawed ' + who + '_drawed"></b>').css({
                'top': y * 30,
                'left': x * 30
            }).appendTo('#playpaths')
        }
    }
    switch (d) {
    case 1:
        x--;
        break;
    case 2:
        y--;
        break;
    case 3:
        x++;
        break;
    case 4:
        y++;
        break
    }
    if (x < 0 || y < 0 || x >= grid_width || y >= grid_height) {
        player_kill(who);
        return
    } else if (window.obstaclesOn === true && window['obstacles'][x] && window['obstacles'][x][y] == 1) {
        player_kill(who);
        return
    } else if (playpaths[x][y] && playpaths[x][y] != who) {
        if (!$('#' + who + '_cursor').length)
            return;
        if ($('#' + playpaths[x][y] + '_cursor').length) {
            if (who == 'p1') {
                killed_other++
            }
            player_kill(playpaths[x][y])
        }
        dm++;
        if (x < co[0]) {
            co[0] = x
        }
        if (y < co[1]) {
            co[1] = y
        }
        if (x > co[2]) {
            co[2] = x
        }
        if (y > co[3]) {
            co[3] = y
        }
        playpaths[x][y] = who
    } else if (playground[x][y] != who) {
        if (playpaths[x][y] == who) {
            player_kill(who);
            return
        } else {
            dm++;
            if (x < co[0]) {
                co[0] = x
            }
            if (y < co[1]) {
                co[1] = y
            }
            if (x > co[2]) {
                co[2] = x
            }
            if (y > co[3]) {
                co[3] = y
            }
            playpaths[x][y] = who
        }
    } else if (playground[x][y] == who && dm > 0) {
        path_closed(who);
        dm = 0
    }
    if (!$('#' + who + '_cursor').length)
        return;
    if (d)
        $('#' + who + '_cursor').animate({
            'top': y * 30,
            'left': x * 30
        }, 140 * 100 / game_speed, 'linear', (function(w) {
            return function() {
                game_move(w)
            }
        }
        )(who));
    if (!$('#' + who + '_cursor').css('top'))
        return;
    updatePosOuter(who, skip_animation);
    $('#grid').css('transform', 'scale(' + grid_scale + ')');
    window[who + '_x'] = x;
    window[who + '_y'] = y;
    window[who + '_dl'] = d;
    window[who + '_dm'] = dm;
    window[who + '_co'] = co
}
function updatePosOuter(who, skip_animation) {
    if (!$('#' + who + '_cursor').css('top'))
        return;
    grid_top = $('#' + who + '_cursor').css('top').replace('px', '') * 1;
    grid_left = $('#' + who + '_cursor').css('left').replace('px', '') * 1;
    grid_top += 30 / 2;
    grid_left += 30 / 2;
    var width = 2700;
    grid_top = grid_top / 2 * (grid_scale * 2) + 2100 / 2 - 2100 * grid_scale / 2;
    grid_left = ((grid_left / 2) * (grid_scale * 2) + (width / 2 - width * grid_scale / 2));
    if (who == 'p1') {
        if (skip_animation || prev_scale != grid_scale) {
            prev_scale = grid_scale;
            $('#outer_grid').stop(true).css({
                'top': -grid_top,
                'left': -grid_left
            })
        } else {
            $('#outer_grid').stop(true).animate({
                'top': -grid_top,
                'left': -grid_left
            }, 140 * 100 / game_speed, 'linear')
        }
    }
}
function countForFF() {
    if (!$('#' + who + '_cursor').css('top'))
        return;
    grid_top = $('#' + who + '_cursor').css('top').replace('px', '') * 1;
    grid_left = $('#' + who + '_cursor').css('left').replace('px', '') * 1;
    grid_top += 30 / 2;
    grid_left += 30 / 2;
    var width = 2700;
    grid_top = grid_top / 2 * (grid_scale * 2) + 2100 / 2 - 2100 * grid_scale / 2;
    grid_left = ((grid_left / 2) * (grid_scale * 2) + (width / 2 - width * grid_scale / 2));
    if (who == 'p1') {
        if (skip_animation || prev_scale != grid_scale) {
            prev_scale = grid_scale;
            $('#outer_grid').stop(true).css({
                'top': -grid_top,
                'left': -grid_left
            })
        } else {
            $('#outer_grid').stop(true).animate({
                'top': -grid_top,
                'left': -grid_left
            }, 140 * 100 / game_speed, 'linear')
        }
    }
}
var newgame_loaded = null;
function showLoad() {
    $(".play").hide();
    $(".loader").show();
    $('.mode').addClass("disabled");
    setTimeout(showResetUI, 10 * 1000)
}
function showResetUI() {
    $(".noConnectBtn").show();
    $(".noConnectText").show()
}
function game_start(again) {
    if (typeof (window.game_mode_forced) !== 'undefined') {
        if (window.game_mode_forced != '') {
            game_mode = window.game_mode_forced
        }
    }
    if (newgame_loaded === false)
        return;
    newgame_loaded = false;
    modesReady = false;
    if (game_mode == 'mini_labclassic') {
        if (window.loadedModes.lab == true) {
            modesReady = true;
            $.ajax({
                url: '/newpaperio/modes/labyrinth/ajax/newgame.php',
                method: 'POST',
                data: {
                    'game_mode': game_mode,
                    'game_challenge': game_challenge
                }
            })
        } else {
            newgame_loaded = false;
            showLoad();
            $.ajax({
                url: '/newpaperio/modes/labyrinth/ajax/pack_lab.php',
                method: 'POST',
                data: {
                    'game_mode': game_mode,
                    'game_challenge': game_challenge
                },
                success: function(data) {
                    $.ajax({
                        url: '/newpaperio/modes/labyrinth/ajax/newgame.php',
                        method: 'POST',
                        data: {
                            'game_mode': game_mode,
                            'game_challenge': game_challenge
                        },
                        success: function(data) {
                            $.ajax({
                                url: '/newpaperio/modes/labyrinth/ajax/labyrinth.php',
                                method: 'POST',
                                data: {
                                    'game_mode': game_mode,
                                    'game_challenge': game_challenge
                                },
                                success: function(data) {
                                    window.loadedModes.lab = true;
                                    window.modeLoaded = true;
                                    modesReady = true;
                                    $('.mode').removeClass("disabled");
                                    $(".loader").hide()
                                }
                            })
                        }
                    })
                }
            })
        }
    } else if (game_mode == "paper1_party") {
        document.location.href = '/ch/?newparty';
        return
    } else if (game_mode == "new_agarpaper") {
        var NickName = document.getElementById('paperio_p1').value;
        document.getElementById('agarNickName').value = NickName;
        document.getElementById('formAgar').submit()
    } else if (game_mode == "new_jumpfall") {
        var NickName = document.getElementById('paperio_p1').value;
        document.getElementById('jumpfallNickName').value = NickName;
        document.getElementById('formJumpFall').submit()
    } else if (game_mode == "new_skibidi") {
        var NickName = document.getElementById('paperio_p1').value;
        document.getElementById('skibidiNickName').value = NickName;
        document.getElementById('formSkibidi').submit()
    } else if (game_mode == "paper3d_classic") {
        var NickName = document.getElementById('paperio_p1').value;
        document.getElementById('paper3dNickName').value = NickName;
        document.getElementById('formPaper3d').submit()
    } else if (game_mode == "paper2_conflict") {
        var NickName = document.getElementById('paperio_p1').value;
        document.getElementById('conflictNickName').value = NickName;
        document.getElementById('formConflict').submit();
        return
    } else if (game_mode == "paper2_worldmap") {
        var NickName = document.getElementById('paperio_p1').value;
        document.getElementById('worldmapNickName').value = NickName;
        document.getElementById('formWorldMap').submit();
        return
    } else if (game_mode == "paper2_battleroyale") {
        var NickName = document.getElementById('paperio_p1').value;
        document.getElementById('brNickName').value = NickName;
        document.getElementById('formBR').submit();
        return
    } else if (game_mode == "paper2_teams") {
        var NickName = document.getElementById('paperio_p1').value;
        document.getElementById('teamsNickName').value = NickName;
        document.getElementById('formTeams').submit();
        return
    } else if (game_mode == "paper2_party") {
        document.location.href = '/ps/?newparty';
        return
    } else if (game_mode == "mini_flappy") {
        window.location.href = '/flappy'
    } else if (game_mode == "mini_splat") {
        window.location.href = '/splat'
    } else if (game_mode == "mini_tower") {
        window.location.href = '/tower'
    } else if (game_mode == 'mini_labegypt') {
        if (window.loadedModes.labEgpt == true) {
            modesReady = true;
            $.ajax({
                url: '/newpaperio/modes/labyrinth/labyrinthEgypt/ajax/newgame.php',
                method: 'POST',
                data: {
                    'game_mode': game_mode,
                    'game_challenge': game_challenge
                },
                success: function(data) {
                    LabyrinthEgypt.firstSet();
                    LabyrinthEgypt.init()
                }
            })
        } else {
            newgame_loaded = false;
            showLoad();
            $.ajax({
                url: '/newpaperio/modes/labyrinth/ajax/pack_lab.php',
                method: 'POST',
                data: {
                    'game_mode': game_mode,
                    'game_challenge': game_challenge
                },
                success: function(data) {
                    $.ajax({
                        url: '/newpaperio/modes/labyrinth/labyrinthEgypt/ajax/newgame.php',
                        method: 'POST',
                        data: {
                            'game_mode': game_mode,
                            'game_challenge': game_challenge
                        },
                        success: function(data) {
                            $.ajax({
                                url: '/newpaperio/modes/labyrinth/labyrinthEgypt/ajax/labyrinth.php',
                                method: 'POST',
                                data: {
                                    'game_mode': game_mode,
                                    'game_challenge': game_challenge
                                },
                                success: function(data) {
                                    var stylesheet = loadCSS("newpaperio/modes/labyrinth/labyrinthEgypt/ajax/style.css");
                                    onloadCSS(stylesheet, function() {
                                        window.loadedModes.labEgpt = true;
                                        window.modeLoaded = true;
                                        modesReady = true;
                                        $('.mode').removeClass("disabled");
                                        $(".loader").hide();
                                        LabyrinthEgypt.firstSet();
                                        LabyrinthEgypt.init()
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    } else if (game_mode == 'mini_papervsblocks') {
        if (window.loadedModes.blocks == true) {
            modesReady = true;
            $.ajax({
                url: '/newpaperio/modes/blocksSnake/ajax/newgame.php',
                method: 'POST',
                data: {
                    'game_mode': game_mode,
                    'game_challenge': game_challenge
                }
            })
        } else {
            showLoad();
            newgame_loaded = false;
            $.ajax({
                url: '/newpaperio/modes/blocksSnake/ajax/pack_blocks.php',
                method: 'POST',
                data: {
                    'game_mode': game_mode,
                    'game_challenge': game_challenge
                },
                success: function(data) {
                    $.ajax({
                        url: '/newpaperio/modes/blocksSnake/ajax/newgame.php',
                        method: 'POST',
                        data: {
                            'game_mode': game_mode,
                            'game_challenge': game_challenge
                        },
                        success: function(data) {
                            $.ajax({
                                url: '/newpaperio/modes/blocksSnake/ajax/blocks.php',
                                method: 'POST',
                                data: {
                                    'game_mode': game_mode,
                                    'game_challenge': game_challenge
                                },
                                success: function(data) {
                                    loadjs(["/newpaperio/modes/blocksSnake/scripts/proton.min.js", "/newpaperio/modes/blocksSnake/scripts/CSSPlugin.min.js", "/newpaperio/modes/blocksSnake/scripts/TweenMax.min.js"], function() {
                                        window.loadedModes.blocks = true;
                                        window.modeLoaded = true;
                                        modesReady = true;
                                        $(".loader").hide();
                                        $('.mode').removeClass("disabled")
                                    }, true)
                                }
                            })
                        }
                    })
                }
            })
        }
    } else {
        modesReady = true;
        $.ajax({
            url: '/newpaperio/ajax/newgame.php',
            method: 'POST',
            data: {
                'game_mode': game_mode,
                'game_challenge': game_challenge
            }
        })
    }
    var geturl = document.URL.match(/channel=([0-9]+)/);
    if (geturl) {
        var getchannel = geturl[1]
    } else {
        var getchannel = 0
    }
    if (game_challenge) {
        ga('send', 'event', 'challenges', 'challenge_' + game_challenge)
    } else if (again) {
        if (game_mode == "paper2_xmas")
            ga('send', 'event', 'christmas', 'play_again');
        else
            ga('send', 'event', 'submit', 'play_again');
        if (getchannel > 0) {
            $.ajax({
                url: '/newpaperio/ajax/stats.php',
                method: 'POST',
                data: {
                    'type': 'play_again',
                    'channel': getchannel,
                    'game_mode': game_mode
                }
            })
        } else {
            $.ajax({
                url: '/newpaperio/ajax/stats.php',
                method: 'POST',
                data: {
                    'type': 'play_again',
                    'channel': 0,
                    'game_mode': game_mode
                }
            })
        }
    } else {
        ga('send', 'event', 'submit', 'play');
        if (getchannel > 0) {
            $.ajax({
                url: '/newpaperio/ajax/stats.php',
                method: 'POST',
                data: {
                    'type': 'play',
                    'channel': getchannel,
                    'game_mode': game_mode
                }
            })
        } else {
            $.ajax({
                url: '/newpaperio/ajax/stats.php',
                method: 'POST',
                data: {
                    'type': 'play',
                    'channel': 0,
                    'game_mode': game_mode
                }
            })
        }
        if ($('#paperio_p1').val())
            Cookies.set('paperio_username', $('#paperio_p1').val(), {
                expires: 30
            })
    }
    if (typeof afg_do !== 'undefined') {
        afg_do()
    } else {
        game_starter()
    }
}
function hideSiteUI() {
    $('#left').hide();
    $('#right').hide();
    $('#bottom').hide();
    $('#share').hide();
    $('#links').hide();
    $('#darktheme').hide();
    $('#cmpPersistentLink').hide();
    $('#cpmstar_anchor').hide();
    $('#pre_game').hide();
    $('#game_over').hide()
}
function game_starter(byLoad=false) {
    if (game_mode.slice(0, 6) == 'paper2') {
        if (game_mode == "paper2_xmas") {
            if (window.paper2xmas) {
                window.ga && window.ga('send', 'event', 'christmas', 'start_play');
                window.paper2xmas.start();
                hideSiteUI();
                $(".loader").hide();
                $('.mode').removeClass("disabled")
            } else {
                if (startedLoadMode == false) {
                    showLoad();
                    startedLoadMode = true;
                    loadjs(["bundleXmas.js"], function() {
                        window.loadedModes.xmas = true;
                        window.modeLoaded = true;
                        modesReady = true
                    }, true)
                }
                window.setTimeout(game_starter, 100)
            }
        } else {
            hideSiteUI();
            if (window.paper2) {
                window.ga && window.ga('send', 'event', 'paper2', 'start_play');
                window.paper2.start()
            } else {
                window.setTimeout(game_starter, 100)
            }
        }
        return
    }
    if (!newgame_loaded || !modesReady) {
        window.setTimeout(game_starter, 100);
        return
    }
    if (window.game_mode == 'mini_labclassic') {
        if (byLoad == true || window.loadedModes.lab == true) {
            if (typeof game_starter_lab !== 'undefined') {
                game_starter_lab()
            } else {
                window.setTimeout(game_starter, 100)
            }
        }
        return
    }
    if (window.game_mode == 'mini_labegypt') {
        if (byLoad == true || window.loadedModes.labEgpt == true) {
            if (typeof game_starter_lab !== 'undefined') {
                game_starter_lab()
            } else {
                window.setTimeout(game_starter, 100)
            }
        }
        return
    }
    if (window.game_mode == 'mini_papervsblocks') {
        if (byLoad == true || window.loadedModes.blocks == true) {
            if (typeof Blocks !== 'undefined' && typeof Blocks.game_starter !== 'undefined') {
                Blocks.game_starter()
            } else {
                window.setTimeout(game_starter, 100)
            }
        }
        return
    }
    newgame_loaded = null;
    cleanObstacles();
    if (window.obstaclesOn === true) {
        obstaclesMake()
    }
    window.usedIndxs = [];
    for (i = 1; i <= 9; i++) {
        var chooseSkin = Math.random() * 10;
        var type = "";
        if (chooseSkin >= 5) {
            var indx = -1;
            do {
                indx = Math.floor(Math.random() * 18 + 1);
                if (indx < 10) {
                    type = 'skin_0' + indx
                } else {
                    type = 'skin_' + indx
                }
            } while (type == "" || type == Cookies.get('skin') || window.usedIndxs.indexOf(indx) > -1);
            window.usedIndxs.push(indx);
            window['skinp' + i] = type
        } else {
            type = "col" + i;
            window['skinp' + i] = type
        }
        $('#p' + i + '_cursor').addClass(" " + type + " unit " + "p" + i)
    }
    grid_scale = 1;
    prev_scale = 1;
    $('#left').hide();
    $('#right').hide();
    $('#bottom').hide();
    $('#share').hide();
    $('#links').hide();
    $('#darktheme').hide();
    $('#cmpPersistentLink').hide();
    $('#cpmstar_anchor').hide();
    $('div').each(function(i) {
        if ((this.style.zIndex == 100) && ((this.style.left == '0px') || (this.style.right == '0px'))) {
            this.style.display = 'none'
        }
    });
    pause = false;
    game_timer = +new Date();
    game_timer_c = 0;
    killed_other = 0;
    killed_total = 0;
    var cookie_skin = Cookies.get('skin');
    var cookie_name = Cookies.get('paperio_username');
    if ($('#paperio_p1').val()) {
        spawn('p1', $('#paperio_p1').val())
    } else if (cookie_name) {
        spawn('p1', cookie_name)
    } else {
        spawn('p1', 'You')
    }
    game_move('p2', 1);
    game_move('p3', 1);
    game_move('p4', 1);
    game_move('p5', 1);
    game_move('p6', 1);
    game_move('p7', 1);
    game_move('p8', 1);
    game_move('p9', 1)
}
function resetPage() {
    location.reload()
}
function screen_sizes() {
    if (game_mode == 'mini_papervsblocks')
        return;
    $('#paperio #outer_grid').css({
        'width': grid_width * 30 + $('#paperio').width(),
        'height': grid_height * 30 + $('#paperio').height()
    });
    $('#paperio #grid').css({
        'width': grid_width * 30,
        'height': grid_height * 30,
        'left': $(window).width() / 2,
        'top': $('#paperio').height() / 2
    })
}
$(document).ready(function() {
    if (game_with_modes) {
        $('#paperio #pre_game .button.play').css({
            'right': -1000
        }).show().animate({
            'right': 0
        }, 300);
        $('#paperio #game_over .button.play').css({
            'margin-left': 1118
        }).show().animate({
            'margin-left': -28
        }, 300);
        $('#paperio #game_over .button.share').css({
            'margin-left': -1118
        }).show().animate({
            'margin-left': -208
        }, 300);
        $('#paperio #game_over .button.mode').css({
            'margin-left': -1118
        }).show().animate({
            'margin-left': -158
        }, 300)
    } else {
        $('#paperio #pre_game .button.play').css({
            'right': -1000
        }).show().animate({
            'right': 0
        }, 300);
        $('#paperio #game_over .button.play').css({
            'margin-left': 1118
        }).show().animate({
            'margin-left': -28
        }, 300);
        $('#paperio #game_over .button.share').css({
            'margin-left': -1118
        }).show().animate({
            'margin-left': -208
        }, 300)
    }
});
$(document).ready(function() {
    screen_sizes()
});
$(window).on('resize', function() {
    screen_sizes()
});
var isFirefox = typeof InstallTrigger !== 'undefined';
function gamemode_dropdown(force_close) {
    if (force_close) {
        $('#gamemode_dropdown').removeClass('open')
    } else {}
    if ($('#gamemode_dropdown').hasClass('open')) {
        $('#bottom').animate({
            'top': 600
        }, 50);
        $('#gamemode_dropdown .options').slideDown(50)
    } else {
        $('#bottom').animate({
            'top': 370
        }, 50);
        $('#gamemode_dropdown .options').slideUp(50)
    }
    window.maxLabWon = Cookies.get('lab_doneMax');
    if (typeof window.maxLabWon == 'string') {
        window.maxLabWon = parseInt(window.maxLabWon)
    }
    if (typeof window.maxLabWon === 'undefined' || window.maxLabWon == null || isNaN(window.maxLabWon) == true) {
        window.maxLabWon = 0
    }
    window.maxEgyptLabWon = Cookies.get('labEgypt_doneMax');
    if (typeof window.maxEgyptLabWon == 'string') {
        window.maxEgyptLabWon = parseInt(window.maxEgyptLabWon)
    }
    if (typeof window.maxEgyptLabWon === 'undefined' || window.maxEgyptLabWon == null || isNaN(window.maxEgyptLabWon) == true) {
        window.maxEgyptLabWon = 0
    }
    $("#labOption").html("Labyrinth - " + window.maxLabWon + "/10");
    $("#labEgptOption").html("Egypt Labyrinth - " + window.maxEgyptLabWon + "/10")
}
if (game_with_modes) {
    var game_mode = 'paper1_classic'
} else {
    var game_mode = ''
}
var game_challenge = 0;
var obstaclesOn = false;
var xmasOn = false;
var game_speed = 100;
var reverse_control = false;
function gamemode_switch(caption, gamemode) {
    console.log(caption + ' : ' + gamemode);
    game_mode = gamemode;
    window.game_mode_forced = '';
    var fb_link = document.getElementById("helpinfoid");
    fb_link.href = 'https://goo.gl/forms/UUdDm1r4sxiNMJ0z2';
    fb_link.innerText = 'Help us make the game better!';
    switch (game_mode) {
    case 'paper2_classic':
    case 'paper2_xmas':
    case 'paper2_small':
    case 'paper2_fastspeed':
        if (!Path2D) {
            $(".play").hide()
        }
        fb_link.href = 'https://goo.gl/forms/5CqPec0ZbEZEdSza2';
        fb_link.innerText = 'Make Paper.io 2 better!';
        break;
    case 'agar_classic':
        break;
    case 'mini_flappy':
        break;
    case 'mini_tower':
        break;
    case 'mini_splat':
        break;
    case 'paper1_classic':
        game_speed = 100;
        grid_width = 90;
        grid_height = 70;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        break;
    case 'mini_labclassic':
        game_speed = 100;
        grid_width = 90;
        grid_height = 70;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        botsOn = false;
        window.curLab = Cookies.get('lab_done');
        if (typeof window.curLab === 'undefined' || window.curLab == null) {
            window.curLab = 0
        }
        if (typeof window.maxLabWon === 'undefined' || window.maxLabWon == null) {
            window.maxLabWon = 0
        }
        $('#gamemode_dropdown .selected .c').text("Labyrinth - " + window.maxLabWon + "/10");
        break;
    case 'mini_labegypt':
        game_speed = 100;
        grid_width = 90;
        grid_height = 70;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        botsOn = false;
        window.curEgyptLab = Cookies.get('labEgypt_done');
        if (typeof window.curEgyptLab === 'undefined' || window.curEgyptLab == null) {
            window.curEgyptLab = 0
        }
        $('#gamemode_dropdown .selected .c').text("Egypt Labyrinth - " + window.maxEgyptLabWon + "/10");
        break;
    case 'mini_papervsblocks':
        game_speed = 80;
        grid_width = 90;
        grid_height = 70;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        botsOn = false;
        break;
    case 'paper1_fastspeed':
        game_speed = 200;
        grid_width = 90;
        grid_height = 70;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        break;
    case 'paper1_slowspeed':
        game_speed = 50;
        grid_width = 90;
        grid_height = 70;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        break;
    case 'paper1_invertedcontrols':
        game_speed = 100;
        grid_width = 90;
        grid_height = 70;
        reverse_control = true;
        obstaclesOn = false;
        xmasOn = false;
        break;
    case 'paper1_small':
        game_speed = 100;
        grid_width = 60;
        grid_height = 46;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        break;
    case 'paper1_smallmapfastspeed':
        game_speed = 200;
        grid_width = 60;
        grid_height = 46;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        break;
    case 'mini_xmas':
        game_speed = 100;
        grid_width = 90;
        grid_height = 70;
        reverse_control = false;
        obstaclesOn = true;
        xmasOn = true;
        break;
    case 'paper1_turbo':
        game_speed = 350;
        grid_width = 90;
        grid_height = 70;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        break;
    default:
        game_speed = 100;
        grid_width = 90;
        grid_height = 70;
        reverse_control = false;
        obstaclesOn = false;
        xmasOn = false;
        break
    }
    window.game_speed = game_speed
}
