//var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
//if( isFirefox ) {
//	alert('Firefox is great browser,\nbut this game works much better in Chrome!\nIf it lags in your Firefox - please switch to Chrome\nand play lag free.\nHave fun!');
//}

/* global variables */
var game_mode;
var select_mode;
var modeMenu;

$(document).ready(function(){
    window.menu = {};
    var modeDropdown = $('#gamemode_dropdown');
    var modeDropdownSelected = modeDropdown.find('.selected');
    var modeDropdownOptions = modeDropdown.find('.options');
    var modeDropdownSections = modeDropdownOptions.find('.sections');
    var modeDropdownSectionsLi;

    modeMenuInit();

    function modeMenuInit(){
        $.getScript("/newpaperio/scripts/dropdown-config-skibidi.js?v5") // loaded menu config file
            .done(function() {
                modeMenu = mode_menu_options;
                createModeMenu(modeMenu);
            })
            .fail(function() {
                console.log('Config script not loaded!');
            });
        modeDropdownSelected.on('click', function(e){
            if (modeDropdown.hasClass('close')){
                open_gamemode_menu();
            }
            else {
                hide_gamemode_menu();
            }
        });
        scrollbarInit();

    }
    function scrollbarInit(){
        var scrollable = $('.scrollable');
        if (scrollable.length){
            scrollable.scrollbar();
        }
    }
    function open_gamemode_menu() {
	var b=document.getElementById('paper-io-com_970x90');
	if( b!=null ) {
		b.style.display = 'none';
	}
        modeDropdown.removeClass('close').addClass('open');
        modeDropdownOptions.slideDown(100);
		gamemode_dropdown();
    }
    function hide_gamemode_menu() {
        if (modeDropdown.hasClass('open')){
	    var b=document.getElementById('paper-io-com_970x90');
	    if( b!=null ) {
		    b.style.display = 'block';
	    }
            modeDropdown.removeClass('open').addClass('close');
            modeDropdownOptions.slideUp(100);
			gamemode_dropdown();
        }
    }
    menu.open_gamemode_menu = open_gamemode_menu;
    menu.hide_gamemode_menu = hide_gamemode_menu;

    function createModeMenu(modeMenu){
        var objectIndex = 1;
        $.each(modeMenu, function( key, value ) {
            var option = document.createElement('li');
            $(option).css('color' , value.text_color);
            $(option).attr('data-mode-code', value.code);
            $(option).attr('data-mode-name', key);
	    $(option).attr('id', 'section_' + value.code);
            $(option).addClass('mode-section');
            if (objectIndex !== 1) {
                setModeItemBg($(option), 0.9);
				setModeItemText($(option), false);
            }
            $(option).text(key);
            var optionUl = document.createElement('ul');
            optionUl.className = "mode-items";
            var itemsIndex = 1;
            $.each(value.items, function( keyItem, valueItem ) {
                var optionLi = document.createElement('li');
                optionLi.setAttribute("data-mode-name", valueItem.label);
                optionLi.setAttribute("data-mode-code", valueItem.code);
		optionLi.setAttribute("id", 'mode_' + value.code + '_' + valueItem.code);
                var radioButton = '<label for="check'+ itemsIndex +'"></label>';
                optionLi.innerHTML = radioButton + '<span>' + valueItem.name + '</span><span class="marker">'+ valueItem.marker + '</span>';
                optionUl.append(optionLi);
                itemsIndex++;
            });
            if (objectIndex === 1){
                select_mode = value.code;
                $(option).addClass('current');
                currentOption = $(option);
                setModeItemBg($(option), 1);
				setModeItemText($(option), true);
            }
            option.append(optionUl);
            if (value.count_new > 0) {
                var countNew = document.createElement('div');
                countNew.setAttribute("class", 'count-new');
                countNew.innerText = value.count_new;
                option.append(countNew);
            }
            if (value.description !== '') {
                var desc = document.createElement('p');
                desc.setAttribute("class", 'desc');
                desc.innerHTML = value.description;
                option.append(desc);
            }
            modeDropdownSections.append(option);
            $(option).on('click', function(e){
                modeSectionAction($(this));
            });
            $(option).hover(function(e){
                if (!$(this).hasClass('current')) {
                    setModeItemBg($(this), 1);
					//setModeItemText($(this), true);
                }
            });
            $(option).on('mouseleave', function(e){
                if (!$(this).hasClass('current')) {
                    setModeItemBg($(this), 0.9);
                   // setModeItemText($(this), false);
                }
            });
            objectIndex++;
        });
        if( window.game_mode_forced == 'paper2_classic' )
	{
		document.getElementById('section_paper2').click();
		//document.getElementById('mode_paper2_classic').click();
	} else {	
	        var firstMode = modeDropdownSections.find('li:first-child');
	        setModeAreaBg(firstMode);
	        setModeItemsInArea(firstMode);
	}

    }
    function modeSectionAction(elem){
       
        var modeCodeThis = $(elem).attr('data-mode-code'),
            game_mode = modeCodeThis + '_',
            select_mode = modeCodeThis;
	var pb = document.getElementById('newparty_ch');
	try 
	{
		if( modeCodeThis == 'paper1' ) {
			pb.onclick = function () { document.location.href='/ch/?newparty'; }	
		} else {
			pb.onclick = function () { document.location.href='/ps/?newparty'; }	
		}
	} catch (e) {
		console.log('onclick set try-catch');
	}
        if (!$(elem).hasClass('current')) {
            modeDropdownSectionsLi = modeDropdownSections.find('.mode-section');
            setModeItemsInArea($(elem));
            modeDropdownSectionsLi.each(function(indx, item) {
                var modeCodeItem = $(item).attr('data-mode-code');
                if (modeCodeThis === modeCodeItem) {
                    $(item).addClass('current');
                    setModeItemBg($(item), 1);
                    setModeAreaBg($(item));
					setModeItemText($(item), true);
                }
                else {
                    $(item).removeClass('current');
                    setModeItemBg($(item), 0.9);
					setModeItemText($(item), false);
                }
            });
        }
    }
    function modeItemsAction(elem){
       
        var modeItems = modeDropdownOptions.find('.mode-items li');
        modeItems.each(function(indx, itm){
            $(itm).removeClass('check');
        });
        $(elem).addClass('check');
        game_mode = select_mode + '_' + $(elem).attr('data-mode-code');
        modeDropdownSelected.find('span.c').text($(elem).attr('data-mode-name'));
		//var caption = $( elem ).attr( "data-mode-name" )
	if(window.gamemode_switch) gamemode_switch("", game_mode);
	if(window.paper2) {
		window.paper2.switch(game_mode);
	}
    }

    function modeItemsActionName(elem, menu, modeName){
       
        var modeItems = menu.find('.mode-items li');
        modeItems.each(function(indx, itm){
            $(itm).removeClass('check');
        });
        $(elem).addClass('check');
        game_mode = modeName;
        modeDropdownSelected.find('span.c').text($(elem).attr('data-mode-name'));
		//var caption = $( elem ).attr( "data-mode-name" )
        if(window.gamemode_switch) gamemode_switch("", game_mode);
        if(window.paper2) {
            window.paper2.switch(game_mode);
        }
    }

    menu.modeSectionAction = modeSectionAction;
    menu.modeItemsAction = modeItemsAction;
    menu.modeItemsActionName = modeItemsActionName;

    function setModeItemsInArea(item){
        var modeItems = $(item).find('.mode-items'),
            itemsArea = $('.items_area'),
            sectionDesc = $(item).find('.desc'),
            modeName = $(item).attr('data-mode-name'),
            listOffset = modeMenu[modeName].list_offset;
			
		select_mode = $(item).attr('data-mode-code');
			
        modeItems = modeItems.clone();
        modeItems.css('margin-left', listOffset + 'px');
        itemsArea.html(modeItems);
        if (sectionDesc.length > 0){
            sectionDesc = sectionDesc.clone();
            itemsArea.append(sectionDesc);
        }
        modeItems.find('li').on('click', function(e){
            modeItemsAction($(this));
        });
		
        modeItemsAction(modeItems.find('li:first-child'));//doesnt remember chosen last
		//set chosen auto
    }

    function setModeItemBg(item, opacity){
        var bgColor = modeMenu[$(item).attr('data-mode-name')].bg_color;
        $(item).css('background-color', 'rgba(' + bgColor + ',' + opacity + ')');
    }
	 function setModeItemText(item, black){
        var textColor = modeMenu[$(item).attr('data-mode-name')].text_color;
		if(black)
		{
			var textColor = '#000000'
		}
        $(item).css('color', ''+textColor);
    }
    function setModeAreaBg(item){
        var itemBg = $(item).css('backgroundColor');
        $('.items_area').css('background-color', itemBg);
    }

    
    window.menu.setModeItemsInArea = setModeItemsInArea;
    window.menu.setModeAreaBg = setModeAreaBg

	
});