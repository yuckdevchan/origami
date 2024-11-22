if( window.sessionStorage.getItem("SkinGamesToday") === null ) { window.sessionStorage.setItem("SkinGamesToday", 0); }
if( window.sessionStorage.getItem("SkinKillsToday") === null ) { window.sessionStorage.setItem("SkinKillsToday", 0); }

window.CheckSkinStatus = function(GameScore, GameTime, GameKills, GameMode)
{
	var SkinGamesToday = parseInt(window.sessionStorage.getItem("SkinGamesToday"),10);
	var SkinKillsToday = parseInt(window.sessionStorage.getItem("SkinKillsToday"),10);

	//alert(SkinGamesToday); alert(SkinKillsToday);

	var NewSkinUnlocked = 0;
	var SkinsHTML = '';
	
	SkinGamesToday = SkinGamesToday + 1;
	SkinKillsToday = SkinKillsToday + GameKills;

	if( SkinGamesToday == 27 ) 
	{
		paperio_challenges['c27'] = 1;
		NewSkinUnlocked = 1;
		if( SkinsHTML != '' ) SkinsHTML += '<br/>';
		SkinsHTML += '<img src="/newpaperio/images/clownHead60.png"><div class="SkinUnlockedText">Clown skin unlocked!</div>';
		window.ga('send', 'event', 'skins_unlock', 'clown');
	}

	if( SkinGamesToday == 50 ) 
	{
		paperio_challenges['doge'] = 1;
		NewSkinUnlocked = 1;
		if( SkinsHTML != '' ) SkinsHTML += '<br/>';
		SkinsHTML += '<img src="/newpaperio/images/doge.png"><div class="SkinUnlockedText">Doge skin unlocked!</div>';
		window.ga('send', 'event', 'skins_unlock', 'doge');
	}

	if( SkinKillsToday >= 300 )
	{
		var Joker = 0;
		if( typeof paperio_challenges['kill300'] !== undefined )
		{
			if( paperio_challenges['kill300'] != 1 )
			{
				Joker = 1;
			}
		} else 
		{
			Joker = 1;
		}
		if( Joker == 1 )
		{
			paperio_challenges['kill300'] = 1;
			NewSkinUnlocked = 1;
			if( SkinsHTML != '' ) SkinsHTML += '<br/>';
			SkinsHTML += '<img src="/newpaperio/images/jokerFace60.png"><div class="SkinUnlockedText">Joker skin unlocked!</div>';
			window.ga('send', 'event', 'skins_unlock', 'joker');
		}
	}

	if( GameKills >= 50 )
	{
		var Reaper = 0;
		if( typeof paperio_challenges['kill50'] !== undefined )
		{
			if( paperio_challenges['kill50'] != 1 )
			{
				Reaper = 1;
			}
		} else 
		{
			Reaper = 1;
		}
		if( Reaper == 1 )
		{
			paperio_challenges['kill50'] = 1;
			NewSkinUnlocked = 1;
			if( SkinsHTML != '' ) SkinsHTML += '<br/>';
			SkinsHTML += '<img src="/newpaperio/images/reaper60.png"><div class="SkinUnlockedText">Reaper skin unlocked!</div>';
		}
	}

	if( NewSkinUnlocked == 1 )
	{
		Cookies.set('paperio_challenges', paperio_challenges, { expires: 30 });
	}
	var SkinUnlocked = document.getElementById('SkinUnlocked');
	SkinUnlocked.innerHTML = SkinsHTML;

	window.sessionStorage.setItem("SkinGamesToday", SkinGamesToday);
	window.sessionStorage.setItem("SkinKillsToday", SkinKillsToday);	
}