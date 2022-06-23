# SO-NUTS
![so nuts banner@420x](https://user-images.githubusercontent.com/92303930/175326921-b306735c-4baa-42f6-a451-500ff26e5687.png)

## Inhoudsopgave
- [Beschrijving](#beschrijving)
- [Poster](#poster)
- [Live demo](#live-demo)
- [Installatie](#installatie)
- [Gebruikershandleiding en functies](#gebruikershandleiding-en-functies)
- [Checklist](#checklist)
- [Prestatieverbeteringen](#prestatieverbeteringen)
- [Auteurs](#auteurs)
- [Licentie](#licentie)

## Beschrijving
Wanneer mensen met pensioen gaan verandert er veel, ook hun eet- en beweeggewoontes. Vaak worden mensen na hun pensioen zwaarder. Dit extra gewicht is met name vetmassa, terwijl de spiermassa juist afneemt. eHealth (zoals applicaties en wearables) is een veel belovende methode om een gepersonaliseerde en aantrekkelijke leefstijlinterventie aan te bieden aan een grote groep mensen, terwijl de kosten laag blijven. Momenteel ontbreekt het aan effectieve, duurzame eet-en beweeginterventies voor mensen die met pensioen gaan. Het project SO-NUTS richt zich op het ontwikkelen van een digitale tool voor mensen die met pensioen gaan. Het doel van deze tool: het stimuleren van een duurzaam beweeg- en voedingspatroon.

## Poster
<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

## Live demo
https://so-nuts.herokuapp.com/

## Installatie
Om te bekijken, bezoek de [Heroku app](https://so-nuts.herokuapp.com/). Om lokale wijzigingen aan te brengen, clone de repository en bewerk de bestanden in een IDE.

## Gebruikershandleiding en functies
In de SO-NUTS app kan je een account aanmaken en een vragenlijst invullen. Vervolgens kan je uit een lijst met doelen kiezen op welke je wilt focussen voor 21 dagen. Iedere dag kan je een doel afvinken als je het doel hebt voltooid en wanneer nodig is er de optie om een doel te verwijderen. Als gebruiker heb je ook een profielpagina met daarop een dagelijkse quote voor motivatie. Wil je meer weten? [Kijk op de wiki voor meer uitleg](https://github.com/lisannevvliet/so-nuts/wiki/Design-Rationale#code-uitleg-op-basis-van-de-customer-journey).

## Checklist
De voltooide taken zijn te vinden in de [commit messages](https://github.com/lisannevvliet/so-nuts/commits/main) en het [project](https://github.com/lisannevvliet/so-nuts/projects/2). De volgende taken konden niet binnen de gestelde tijd worden voltooid, maar zouden leuk zijn om te hebben.

- [ ] Animeer voortgangsbalk.
- [ ] Voeg ondersteuning toe voor combinatie van radio buttons en invoerveld.
- [ ] Implementeer SCSS.
- [ ] Voeg iets vrolijks toe wanneer doel voltooid is.
- [ ] Voeg notificaties toe met service worker.
- [ ] Implementeer uitdagingen waarbij gebruikers tegen elkaar strijden.
- [ ] Versleutel formulier-gegevens.
- [ ] Gebruik lokaal JSON-bestand als Supabase fallback.
- [ ] Stel zowel naam als e-mailadres in als primaire sleutel.

## Prestatieverbeteringen
- [x] Automatisch minifiëren van CSS en JavaScript bij npm start.
- [x] Stel HTTP header veld Cache-control in om niet-HTML GET verzoeken gedurende 1 jaar te cachen.
- [x] Voeg revisie toe aan service worker door het versienummer op te slaan in een variabele.
- [x] Implementeer compressie door gebruik te maken van de corresponderende Node.js module.
- [x] Schrijf zo weinig mogelijk client-side JavaScript.
- [x] Voeg font-display: swap toe aan geïmporteerde fonts in CSS.
- [x] Controleer of afbeeldingen niet onnodig groot zijn.
- [x] Gebruik de meest compacte afbeeldingsformaten: WebP en SVG.
- [x] Verwijder ongebruikte HTML, CSS, JavaScript, lettertypes en afbeeldingen.

[Lighthouse](https://github.com/lisannevvliet/so-nuts/files/8968041/Lighthouse.pdf)

## Auteurs
De auteurs van dit project zijn [Farrahton Piers](https://github.com/farrahton) en [Lisanne van Vliet](https://github.com/lisannevvliet).

## Licentie
Dit project is gelicenseerd onder de [GPL-3.0 licentie](https://github.com/lisannevvliet/so-nuts/blob/main/LICENSE).
