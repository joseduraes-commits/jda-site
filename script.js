const loader=document.querySelector('.loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),2700));
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const menu=document.querySelector('.menu'),nav=document.querySelector('.site-header nav');
const mobileMenuMedia=window.matchMedia('(max-width:800px)');
const setMobileMenuState=open=>{
  const shouldOpen=mobileMenuMedia.matches&&open;
  nav.classList.toggle('open',shouldOpen);
  menu.setAttribute('aria-expanded',String(shouldOpen));
  if(mobileMenuMedia.matches){
    nav.inert=!shouldOpen;
    nav.setAttribute('aria-hidden',String(!shouldOpen));
  }else{
    nav.inert=false;
    nav.removeAttribute('aria-hidden');
  }
  return shouldOpen;
};
const closeMobileMenu=returnFocus=>{
  const wasOpen=nav.classList.contains('open');
  setMobileMenuState(false);
  if(returnFocus&&wasOpen)menu.focus();
};
menu.addEventListener('click',()=>{
  const open=setMobileMenuState(!nav.classList.contains('open'));
  if(open)requestAnimationFrame(()=>nav.querySelector('a')?.focus());
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMobileMenu(true)));
const syncMobileMenu=()=>setMobileMenuState(false);
if(mobileMenuMedia.addEventListener)mobileMenuMedia.addEventListener('change',syncMobileMenu);
else mobileMenuMedia.addListener(syncMobileMenu);
setMobileMenuState(false);
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&mobileMenuMedia.matches&&nav.classList.contains('open')){
    event.preventDefault();
    closeMobileMenu(true);
  }
});
const siteHeader=document.querySelector('.site-header');
const updateHeaderBackground=()=>siteHeader.classList.toggle('is-scrolled',window.scrollY>24);
updateHeaderBackground();
window.addEventListener('scroll',updateHeaderBackground,{passive:true});
window.addEventListener('load',updateHeaderBackground);
window.addEventListener('hashchange',updateHeaderBackground);
const timeline=document.querySelector('.timeline');
const timelineItems=[...document.querySelectorAll('.timeline details')];
const syncTimelineHeight=()=>{
  if(!timeline)return;
  if(window.matchMedia('(max-width:800px)').matches){timeline.style.removeProperty('min-height');return}
  const activeList=timeline.querySelector('details[open] ul');
  const requiredHeight=activeList?196+activeList.scrollHeight+80:690;
  timeline.style.minHeight=`${Math.max(690,requiredHeight)}px`;
};
const activateYear=item=>{
  timelineItems.forEach(other=>{other.open=other===item});
  requestAnimationFrame(syncTimelineHeight);
};
timelineItems.forEach(item=>{
  const summary=item.querySelector('summary');
  summary.addEventListener('mouseenter',()=>activateYear(item));
  item.addEventListener('toggle',()=>{
    if(item.open)timelineItems.forEach(other=>{if(other!==item)other.open=false});
    requestAnimationFrame(syncTimelineHeight);
  });
});
const timelinePortfolioData={
  'Casa Verde':{kicker:'Habitação unifamiliar · Gandra, Esposende',heading:'Uma casa aberta à paisagem.',text:['Implantada num terreno privilegiado em Gandra, a Casa Verde estabelece uma relação profunda com a natureza. A habitação T3 privilegia a luz natural, o conforto e a convivência, enquadrando a paisagem rural através de amplos vãos envidraçados.','A zona social prolonga-se para o jardim, o alpendre e a cozinha exterior. Volumes simples e materiais naturais criam uma casa contemporânea pensada para acompanhar a vida da família.'],images:['pagina-02-01.jpg','pagina-03-01.jpg','pagina-03-02.jpg']},
  'Projeto Barthazar Rooftop':{kicker:'Reabilitação e interiores · Rouen, França',heading:'Um rooftop sobre o centro histórico.',text:['A antiga loja comercial foi transformada num espaço de restauração contemporâneo distribuído por dois pisos. A abertura parcial da cobertura permitiu criar um rooftop panorâmico sobre os telhados e o património de Rouen.','A intervenção preserva a identidade do edifício e introduz uma linguagem atual, valorizando a luz natural, a fluidez dos espaços e a relação com a cidade.'],images:['pagina-05-01.jpg','pagina-06-01.jpg','pagina-07-01.jpg']},
  'Casa Rocha':{kicker:'Habitação unifamiliar T3 · Vila Nova de Famalicão',heading:'Amplitude, luz e materialidade.',text:['A Casa Rocha organiza a sala, a área de refeições e a cozinha num espaço social amplo e contínuo, favorecendo uma vivência familiar fluida e funcional.','O pé-direito duplo reforça a amplitude e a entrada de luz natural, enquanto a seleção de revestimentos e madeiras cria uma atmosfera elegante, confortável e intemporal.'],images:['pagina-08-01.jpg','pagina-09-01.jpg','pagina-10-01.jpg','pagina-11-01.jpg']},
  'Casa Mira Gaia':{kicker:'Reabilitação · Vila Nova de Gaia',heading:'Preservar os anos 70, renovar a forma de habitar.',text:['A reabilitação desta habitação dos anos 70 preserva a sua linguagem original e a relação privilegiada com a paisagem atlântica, adaptando os espaços às atuais exigências de conforto e eficiência.','A intervenção reviu acabamentos, patologias, iluminação e mobiliário à medida, criando uma linguagem coerente entre memória, arquitetura e vida contemporânea.'],images:['pagina-13-01.jpg','pagina-13-02.jpg','pagina-14-01.jpg','pagina-15-01.jpg','pagina-16-01.jpg']},
  'Casa L&T':{kicker:'Habitação unifamiliar T3 · Alvelos, Barcelos',heading:'Uma casa para viver e partilhar.',text:['Com 360 m², a Casa L&T foi desenhada para um casal jovem e para um quotidiano marcado pela convivência. A zona social abre-se totalmente ao jardim, unindo sala, cozinha, terraço e alpendre.','Volumes puros, madeira, betão e vidro definem uma arquitetura contemporânea onde interior, exterior e paisagem funcionam como um único espaço.'],images:['pagina-17-01.jpg','pagina-18-01.jpg']},
  'Casa Montbonnot-Saint-Martin':{kicker:'Habitação unifamiliar · Grenoble, França',heading:'Interiores e exterior numa linguagem contínua.',text:['A proposta transforma a habitação num espaço contemporâneo, funcional e personalizado, privilegiando formas simples, materiais naturais e luz abundante.','Mobiliário integrado e ambientes depurados prolongam-se para a piscina, o deck e o jardim, criando uma casa serena e preparada para perdurar.'],images:['pagina-19-01.jpg','pagina-20-01.jpg','pagina-21-01.jpg','pagina-22-01.jpg','pagina-22-02.jpg']},
  'Empreendimento Habitacional':{kicker:'Habitação coletiva · Paris, França',heading:'Curva, madeira e luz.',text:['O empreendimento introduz uma arquitetura residencial contemporânea onde a curva estrutura a composição e aproxima o edifício da escala humana.','A madeira, os amplos envidraçados, as varandas e o espaço comum ajardinado criam um conjunto acolhedor, sustentável e ligado à vida urbana de Paris.'],images:['pagina-24-01.jpg','pagina-25-01.jpg']},
  'Hostel Sense of Ofir':{kicker:'Reabilitação · Fão, Esposende',heading:'Hospitalidade inspirada pelo espírito de Ofir.',text:['Uma habitação dos anos 70 foi transformada em alojamento local e restaurante de autor, reunindo hospitalidade, gastronomia, natureza e a cultura dos desportos náuticos.','A intervenção preserva a identidade da casa e reorganiza os espaços com luz, materiais naturais e uma atmosfera descontraída ligada à paisagem costeira.'],images:['pagina-30-01.jpg','pagina-31-01.jpg']},
  'Edifício Habitacional para Alojamento Local':{kicker:'Reabilitação · Esposende',heading:'Da degradação a uma nova vida.',text:['A reabilitação e ampliação de um edifício degradado cria um alojamento contemporâneo que respeita a memória do lugar e assume uma forte preocupação ambiental.','Pedra no piso térreo, madeira nos níveis intermédios e superfícies claras no último piso constroem uma transição material entre tradição e contemporaneidade.'],images:['pagina-34-01.jpg']},
  'Casa Espelho':{kicker:'Estúdio de apoio · Obra concluída',heading:'Arquitetura que desaparece na paisagem.',text:['Um contentor marítimo reutilizado transforma-se num estúdio discreto e contemporâneo. O revestimento metálico espelhado reflete a vegetação, a luz e o céu, dissolvendo visualmente o volume.','A organização interior privilegia flexibilidade, conforto e relação com o exterior, demonstrando como reutilização e detalhe podem criar arquitetura com identidade.'],images:['pagina-39-01.jpg','pagina-40-01.jpg']},
  'Os Maias':{kicker:'Reabilitação e ampliação · Vila do Conde',heading:'Um diálogo entre passado e presente.',text:['A intervenção recupera um edifício degradado no centro histórico de Vila do Conde, restaurando a fachada principal e integrando a ampliação de forma discreta na malha existente.','No interior, metal, betão, madeira e vidro constroem uma linguagem industrial contemporânea, com espaços amplos, flexíveis e luminosos.'],images:['pagina-42-01.jpg']},
  'Luxury':{kicker:'Stand de automóveis de luxo · Interiores',heading:'A visita como experiência.',text:['O espaço foi concebido para transformar a aquisição de um automóvel de luxo numa experiência memorável, articulando arquitetura, iluminação, materiais nobres e circulação.','Uma escadaria escultórica organiza a receção e os percursos revelam gradualmente cada automóvel, tratado como uma peça de coleção.'],images:['pagina-44-01.jpg','pagina-45-01.jpg']},
  'Pavilhão Industrial':{kicker:'Arquitetura industrial · Trofa',heading:'Eficiência integrada na topografia.',text:['O pavilhão adapta-se ao declive através de três corpos, reduzindo movimentos de terras e a perceção da sua escala, sem comprometer a flexibilidade produtiva.','A organização separa produção, armazenagem, expedição e administração, enquanto os materiais duráveis e os espaços exteriores qualificados reforçam a identidade empresarial.'],images:['pagina-46-01.jpg']},
  'Centro Hospitalar Ayurveda':{kicker:'Saúde · Mourão, Portugal',heading:'Arquitetura para o equilíbrio e a cura.',text:['O centro hospitalar inspira-se na planta estrelada do Castelo de Mourão para organizar alas clínicas, terapêuticas, residenciais e de apoio em torno de um núcleo comum.','Jardins terapêuticos, pátios, água, luz natural e materiais orgânicos integram a natureza no processo de recuperação e bem-estar.'],images:['pagina-55-01.jpg','pagina-55-02.jpg']},
  'Complexo Habitacional T3 e T4':{kicker:'Habitação · Évora, Portugal',heading:'Um bairro entre arquitetura e natureza.',text:['O complexo reúne habitações T3 e T4 construídas em Wood Frame, combinando eficiência térmica, sustentabilidade e rapidez construtiva.','Jardins, percursos pedonais e áreas comuns promovem comunidade, privacidade e uma relação próxima com a paisagem alentejana.'],images:['pagina-56-01.jpg','pagina-57-01.jpg']},
  'Reconversão de Centro Comercial em Alojamento Local':{kicker:'Reabilitação · Vila Nova de Gaia',heading:'Reativar uma estrutura abandonada.',text:['As antigas lojas convertem-se em unidades de alojamento local e os corredores passam a espaços de circulação, encontro e convivência.','A reutilização da estrutura existente, a luz natural, a vegetação e os materiais quentes devolvem identidade e atividade ao edifício e à envolvente.'],images:['pagina-60-01.jpg']},
  'Habitação Abelheira':{kicker:'Habitação · Esposende',heading:'Uma casa moldada pelo terreno.',text:['A habitação adapta-se ao desnível natural e à presença de um ribeiro, integrando volumes contemporâneos, coberturas ajardinadas, pedra e madeira.','Os grandes vãos enquadram a paisagem e transformam luz, água e vegetação numa presença constante no quotidiano da casa.'],images:['pagina-61-01.jpg']},
  'Alteração, Ampliação e Legalização de Habitação Unifamiliar':{kicker:'Requalificação · Esposende',heading:'Preparar a casa para novas formas de viver.',text:['A intervenção reorganiza a habitação existente, cria duas suites e novas áreas de apoio, reforçando a luz e a ligação aos espaços exteriores.','A ampliação integra sala de relaxamento, sauna, balneário e um estúdio autónomo, unificados por um novo volume revestido a ripado de madeira.'],images:['pagina-67-01.jpg','pagina-67-02.jpg']},
  'Loteamento Habitacional':{kicker:'Planeamento urbano · Fão, Esposende',heading:'Sete lotes numa estrutura de baixa densidade.',text:['O loteamento organiza sete lotes para habitações unifamiliares em torno de um arruamento privado, preservando a casa existente e a sua autonomia.','A implantação procura equilíbrio entre construção, espaço exterior, privacidade e integração na paisagem de Fão.'],images:['pagina-68-01.jpg']}
};
const timelineIndependentData={
  'Casa Verde':{kicker:'Habitação unifamiliar · Gandra, Esposende',heading:'Uma casa aberta à paisagem.',text:['Implantada num terreno privilegiado em Gandra, a Casa Verde estabelece uma relação profunda com a natureza. A habitação T3 privilegia a luz natural, o conforto e a convivência.','A zona social prolonga-se para o jardim, o alpendre e a cozinha exterior. Volumes simples e materiais naturais criam uma casa contemporânea pensada para acompanhar a vida da família.'],images:['assets/timeline-independent/casa-verde/pagina-02-01.jpg','assets/timeline-independent/casa-verde/pagina-03-01.jpg','assets/timeline-independent/casa-verde/pagina-03-02.jpg']},
  'Projeto Barthazar Rooftop':{kicker:'Reabilitação e interiores · Rouen, França',heading:'Um rooftop sobre o centro histórico.',text:['Uma antiga loja foi transformada num espaço de restauração contemporâneo distribuído por dois pisos. A abertura parcial da cobertura permitiu criar um rooftop panorâmico.','A intervenção preserva a identidade do edifício e introduz uma linguagem atual, valorizando a luz natural, a fluidez dos espaços e a relação com Rouen.'],images:['assets/timeline-independent/barthazar/pagina-02-01.jpg','assets/timeline-independent/barthazar/pagina-03-01.jpg','assets/timeline-independent/barthazar/pagina-04-01.jpg','assets/timeline-independent/barthazar/pagina-05-01.jpg']},
  'Casa Rocha':{kicker:'Habitação unifamiliar T3 · Vila Nova de Famalicão',heading:'Amplitude, luz e materialidade.',text:['A sala, a área de refeições e a cozinha organizam-se num espaço social amplo e contínuo, favorecendo uma vivência familiar fluida e funcional.','O pé-direito duplo reforça a amplitude e a entrada de luz natural, enquanto os materiais criam uma atmosfera elegante e intemporal.'],images:['assets/timeline-independent/rocha/pagina-02-01.jpg','assets/timeline-independent/rocha/pagina-03-01.jpg','assets/timeline-independent/rocha/pagina-04-01.jpg']},
  'Bloco de Apoio aos Bombeiros Voluntários de Esposende':{kicker:'Equipamento público · Esposende',heading:'Uma imagem dinâmica ao serviço da comunidade.',text:['O estudo conceptual amplia as instalações dos Bombeiros Voluntários de Esposende e reforça a capacidade de apoio operacional do quartel.','Linhas curvas unem cobertura e fachada num gesto contínuo, enquanto a organização assegura circulações rápidas e separa áreas técnicas, administrativas e de atendimento.'],images:['assets/timeline-independent/bombeiros/pagina-02-01.jpg','assets/timeline-independent/bombeiros/pagina-02-02.jpg']},
  'Casa Mira Gaia':{kicker:'Reabilitação · Vila Nova de Gaia',heading:'Preservar os anos 70, renovar a forma de habitar.',text:['A reabilitação preserva a linguagem original da casa e a relação privilegiada com a paisagem atlântica, adaptando os espaços às exigências atuais.','Acabamentos, patologias, iluminação e mobiliário à medida foram revistos para criar uma relação equilibrada entre memória e vida contemporânea.'],images:['assets/timeline-independent/casa-mira-gaia/pagina-02-01-corrigida.jpg','assets/timeline-independent/casa-mira-gaia/pagina-03-01-corrigida.jpg','assets/timeline-independent/casa-mira-gaia/pagina-04-01-corrigida.jpg','assets/timeline-independent/casa-mira-gaia/pagina-05-01.jpg']},
  'Casa L&T':{kicker:'Habitação unifamiliar T3 · Alvelos, Barcelos',heading:'Uma casa para viver e partilhar.',text:['Com 360 m², a Casa L&T foi desenhada para um casal jovem e para um quotidiano marcado pela convivência. A zona social abre-se totalmente ao jardim.','Volumes puros, madeira, betão e vidro definem uma arquitetura contemporânea onde interior, exterior e paisagem funcionam como um único espaço.'],images:['assets/timeline-independent/alvelos/pagina-02-01.jpg','assets/timeline-independent/alvelos/pagina-02-02.jpg']},
  'Casa Montbonnot-Saint-Martin':{kicker:'Habitação unifamiliar · Grenoble, França',heading:'Interiores e exterior numa linguagem contínua.',text:['A proposta transforma a habitação num espaço contemporâneo e personalizado, privilegiando formas simples, materiais naturais e luz abundante.','Mobiliário integrado e ambientes depurados prolongam-se para a piscina, o deck e o jardim.'],images:['assets/timeline-independent/casa-montbonnot-saint-martin/pagina-02-01.jpg','assets/timeline-independent/casa-montbonnot-saint-martin/pagina-02-02.jpg','assets/timeline-independent/casa-montbonnot-saint-martin/pagina-03-01.jpg','assets/timeline-independent/casa-montbonnot-saint-martin/pagina-03-02.jpg','assets/timeline-independent/casa-montbonnot-saint-martin/pagina-04-01.jpg']},
  'Casa de Brasão':{kicker:'Reabilitação histórica · Carrazeda de Ansiães',heading:'Preservar um legado arquitetónico.',text:['A antiga habitação senhorial foi reabilitada preservando a volumetria, a cobertura, os elementos pétreos e o brasão que identifica a casa.','Soluções contemporâneas melhoram o conforto e a eficiência sem comprometer o caráter histórico do edifício.'],images:['assets/timeline-independent/casa-de-brasao/pagina-02-01.jpg']},
  'Empreendimento Habitacional':{kicker:'Habitação coletiva · Paris, França',heading:'Curva, madeira e luz.',text:['A curva estrutura a composição e aproxima o edifício da escala humana. A madeira confere uma identidade sustentável, acolhedora e intemporal.','Envidraçados, varandas e um espaço comum ajardinado promovem luz natural, bem-estar e sentido de comunidade.'],images:['assets/timeline-independent/empreendimento-habitacional-paris-franca/pagina-02-01.jpg','assets/timeline-independent/empreendimento-habitacional-paris-franca/pagina-02-02.jpg']},
  'Hostel Sense of Ofir':{kicker:'Reabilitação · Fão, Esposende',heading:'Hospitalidade inspirada pelo espírito de Ofir.',text:['Uma habitação dos anos 70 foi transformada em alojamento local e restaurante de autor, reunindo hospitalidade, gastronomia e cultura ligada ao mar.','A intervenção preserva a identidade da casa e reorganiza os espaços com luz, materiais naturais e uma atmosfera descontraída.'],images:['assets/timeline-independent/hostel-sense-of-ofir/pagina-02-01.jpg','assets/timeline-independent/hostel-sense-of-ofir/pagina-03-01.jpg']},
  'Edifício Habitacional para Alojamento Local':{kicker:'Reabilitação · Esposende',heading:'Da degradação a uma nova vida.',text:['A reabilitação e ampliação de um edifício degradado cria um alojamento contemporâneo que respeita a memória do lugar.','Pedra, madeira e superfícies claras constroem uma transição material entre tradição e contemporaneidade.'],images:['assets/timeline-independent/renovacao-de-edificio-habitacional-para-alojamento-local/pagina-02-01.jpg','assets/timeline-independent/renovacao-de-edificio-habitacional-para-alojamento-local/pagina-03-01.jpg']},
  'Casa V&N':{kicker:'Reabilitação e interiores · Fão, Esposende',heading:'Transformar uma casa dos anos 80.',text:['A reabilitação reorganiza os espaços, elimina compartimentações e aproxima cozinha, sala e jardim através de grandes superfícies envidraçadas.','O desempenho térmico e a imagem exterior são atualizados com uma linguagem contemporânea, preservando a memória da construção.'],images:['assets/timeline-independent/casa-v-n/pagina-02-01.jpg','assets/timeline-independent/casa-v-n/pagina-03-01.jpg']},
  'Loteamento Estrada Real':{kicker:'Planeamento urbano · Marinhas, Esposende',heading:'Loteamento Estrada Real',text:[],images:['assets/timeline-independent/estrada/pagina-01-01.jpg']},
  'Desenho de Mobiliário':{kicker:'Projeto de interiores · 2024',heading:'Desenho de Mobiliário',text:[],images:['assets/timeline-independent/de-mobiliario-2024/pagina-01-01.jpg','assets/timeline-independent/de-mobiliario-2024/pagina-02-01.jpg','assets/timeline-independent/de-mobiliario-2024/pagina-03-01.jpg','assets/timeline-independent/de-mobiliario-2024/pagina-04-01.jpg']},
  'Casa Espelho':{kicker:'Estúdio de apoio · Obra concluída',heading:'Arquitetura que desaparece na paisagem.',text:['Um contentor marítimo reutilizado transforma-se num estúdio discreto e contemporâneo. O revestimento espelhado reflete a vegetação, a luz e o céu.','A organização interior privilegia flexibilidade, conforto e relação com o exterior.'],images:['assets/casa-espelho-reflexo-v2.webp']},
  'Os Maias':{kicker:'Reabilitação e ampliação · Vila do Conde',heading:'Um diálogo entre passado e presente.',text:['A intervenção recupera um edifício degradado no centro histórico, preservando a fachada principal e integrando discretamente a ampliação.','Metal, betão, madeira e vidro constroem no interior uma linguagem industrial contemporânea.'],images:['assets/timeline-independent/maias/pagina-02-01.jpg']},
  'Luxury':{kicker:'Stand de automóveis de luxo · Interiores',heading:'A visita como experiência.',text:['O espaço transforma a aquisição de um automóvel de luxo numa experiência memorável, articulando arquitetura, iluminação e materiais nobres.','Uma escadaria escultórica organiza a receção e os percursos revelam gradualmente cada automóvel como peça de coleção.'],images:['assets/timeline-independent/luxury-stand-de-carros-de-luxo/pagina-02-01.jpg','assets/timeline-independent/luxury-stand-de-carros-de-luxo/pagina-03-01.jpg']},
  'Casa F&H':{kicker:'Habitação unifamiliar · Nine, Vila Nova de Famalicão',heading:'Uma casa desenhada para viver a paisagem.',text:['Implantada num lote de 1.900 m², a Casa F&H foi concebida para uma família, privilegiando tranquilidade, conforto e proximidade com a natureza.','A sala em pé-direito duplo articula luz, amplitude e continuidade visual entre o interior, o jardim e a piscina.'],images:['assets/timeline-independent/casa-f-h/pagina-01-01.jpg','assets/timeline-independent/casa-f-h/pagina-02-01.jpg','assets/timeline-independent/casa-f-h/pagina-02-02.jpg']},
  'Pavilhão Industrial':{kicker:'Arquitetura industrial · Trofa',heading:'Eficiência integrada na topografia.',text:['O pavilhão adapta-se ao declive através de três corpos, reduzindo movimentos de terras sem comprometer a flexibilidade produtiva.','A organização separa produção, armazenagem, expedição e administração, enquanto materiais duráveis reforçam a identidade empresarial.'],images:['assets/timeline-independent/pavilhao-industrial-2023-licenciamento/pagina-02-01.jpg','assets/timeline-independent/pavilhao-industrial-2023-licenciamento/pagina-02-02.jpg']},
  'Complexo Habitacional T3 e T4':{kicker:'Habitação · Évora, Portugal',heading:'Um bairro entre arquitetura e natureza.',text:['Num lote com cerca de 7.000 m², o complexo reúne habitações T3 e T4 construídas em Wood Frame, combinando conforto e sustentabilidade.','Jardins, percursos e áreas comuns promovem comunidade, privacidade e relação com a paisagem alentejana.'],images:['assets/timeline-independent/t3-e-t4-evora-portugal/pagina-02-01.jpg','assets/timeline-independent/t3-e-t4-evora-portugal/pagina-02-02.jpg']},
  'Reconversão de Centro Comercial em Alojamento Local':{kicker:'Reabilitação · Vila Nova de Gaia',heading:'Reativar uma estrutura abandonada.',text:['As antigas lojas convertem-se em unidades de alojamento local e os corredores passam a espaços de circulação e convivência.','A reutilização da estrutura existente, a luz e os materiais quentes devolvem identidade e atividade ao edifício.'],images:['assets/timeline-independent/cc/pagina-02-01.jpg']},
  'Habitação Abelheira':{kicker:'Habitação · Esposende',heading:'Uma casa moldada pelo terreno.',text:['A casa adapta-se ao desnível natural e à presença de um ribeiro, integrando volumes contemporâneos, coberturas ajardinadas, pedra e madeira.','Os grandes vãos enquadram a paisagem e transformam luz, água e vegetação numa presença constante.'],images:['assets/timeline-independent/abi/pagina-02-01.jpg','assets/timeline-independent/abi/pagina-02-02.jpg','assets/timeline-independent/abi/pagina-03-01.jpg']},
  'Centro Hospitalar Ayurveda':{kicker:'Saúde · Mourão, Portugal',heading:'Arquitetura para o equilíbrio e a cura.',text:['O centro inspira-se na planta estrelada do Castelo de Mourão para organizar as diferentes alas em torno de um núcleo comum.','Jardins terapêuticos, pátios, água e luz natural integram a natureza no processo de recuperação.'],images:['assets/linha-temporal/pagina-55-01.jpg','assets/linha-temporal/pagina-55-02.jpg']},
  'Alteração, Ampliação e Legalização de Habitação Unifamiliar':{kicker:'Requalificação · Esposende',heading:'Preparar a casa para novas formas de viver.',text:['A intervenção reorganiza a habitação existente, cria duas suites e reforça a relação com os espaços exteriores.','A ampliação integra novas áreas de apoio e um estúdio autónomo numa linguagem arquitetónica unificada.'],images:['assets/linha-temporal/pagina-67-01.jpg','assets/linha-temporal/pagina-67-02.jpg']},
  'Loteamento Habitacional':{kicker:'Planeamento urbano · Fão, Esposende',heading:'Sete lotes numa estrutura de baixa densidade.',text:['O loteamento organiza sete lotes para habitações unifamiliares em torno de um arruamento privado.','A implantação procura equilíbrio entre construção, espaço exterior, privacidade e paisagem.'],images:['assets/linha-temporal/pagina-68-01.jpg']}
};
Object.assign(timelinePortfolioData,timelineIndependentData);
Object.entries(window.timelineFullDescriptions||{}).forEach(([projectName,fullText])=>{
  if(timelinePortfolioData[projectName]) timelinePortfolioData[projectName].text=fullText;
});
const ayurvedaSelectedCopy=document.querySelector('.ayurveda-story .project-story-copy');
const ayurvedaFullText=window.timelineFullDescriptions?.['Centro Hospitalar Ayurveda'];
if(ayurvedaSelectedCopy&&ayurvedaFullText){
  ayurvedaSelectedCopy.replaceChildren(...ayurvedaFullText.map(paragraph=>{
    const element=document.createElement('p');
    element.textContent=paragraph;
    return element;
  }));
}
document.querySelectorAll('.timeline details').forEach(yearItem=>{
  const year=yearItem.querySelector('summary time')?.textContent.trim();
  yearItem.querySelectorAll('ul>li:not(.timeline-project-expandable)').forEach((project,index)=>{
    const title=project.querySelector('h3')?.textContent.trim();
    const meta=project.querySelector('p')?.textContent.trim()||'';
    const data=timelinePortfolioData[title];
    if(!data)return;
    const hasDescription=Array.isArray(data.text)&&data.text.length>0;
    const id=`timeline-pdf-${year}-${index+1}`;
    const slides=data.images.map((src,imageIndex)=>`<figure class="zenith-slide"${imageIndex?' hidden':''}><button class="drawing-lightbox-trigger" type="button"><img src="${src}" alt="${title} — imagem ${imageIndex+1} do projeto"></button><figcaption>${title} · ${String(imageIndex+1).padStart(2,'0')}</figcaption></figure>`).join('');
    const visual=data.images.length>1?`<div class="zenith-carousel" role="region" aria-label="Galeria de ${title}" tabindex="0"><div class="zenith-carousel-viewport">${slides}</div><div class="zenith-carousel-controls"><button class="zenith-carousel-prev" type="button" aria-label="Imagem anterior">←</button><span class="zenith-carousel-count" aria-live="polite"><b>01</b> / ${String(data.images.length).padStart(2,'0')}</span><button class="zenith-carousel-next" type="button" aria-label="Imagem seguinte">→</button></div></div>`:`<figure class="timeline-project-visual"><button class="drawing-lightbox-trigger" type="button"><img src="${data.images[0]}" alt="${title} — imagem do projeto"></button><figcaption>${title}</figcaption></figure>`;
    const copy=hasDescription?`<div class="timeline-concept-copy"><p class="timeline-concept-credit">${data.kicker} · ${year}</p><h3>${data.heading}</h3>${data.text.map(text=>`<p>${text}</p>`).join('')}</div>`:'';
    project.classList.add('timeline-project-expandable');
    project.innerHTML=`<button class="timeline-project-toggle" type="button" aria-expanded="false" aria-controls="${id}"><span class="timeline-project-copy"><strong>${title}</strong><small>${meta}</small></span><span class="timeline-project-action">${hasDescription?'Ver projeto':'Ver imagens'} <b aria-hidden="true">+</b></span></button><div class="timeline-project-drawings timeline-project-concept${hasDescription?'':' timeline-project-images-only'}" id="${id}" hidden>${copy}${visual}</div>`;
  });
});
const timelineProjectToggles=[...document.querySelectorAll('.timeline-project-toggle')];
timelineProjectToggles.forEach(toggle=>{
  const panel=document.getElementById(toggle.getAttribute('aria-controls'));
  toggle.addEventListener('click',()=>{
    const isOpen=toggle.getAttribute('aria-expanded')==='true';
    timelineProjectToggles.forEach(other=>{
      const otherPanel=document.getElementById(other.getAttribute('aria-controls'));
      other.setAttribute('aria-expanded','false');
      otherPanel.hidden=true;
    });
    if(!isOpen){toggle.setAttribute('aria-expanded','true');panel.hidden=false}
    requestAnimationFrame(syncTimelineHeight);
  });
});
document.querySelectorAll('.zenith-carousel').forEach(carousel=>{
  const slides=[...carousel.querySelectorAll('.zenith-slide')];
  const previous=carousel.querySelector('.zenith-carousel-prev');
  const next=carousel.querySelector('.zenith-carousel-next');
  const current=carousel.querySelector('.zenith-carousel-count b');
  let activeIndex=0;
  const showSlide=index=>{
    activeIndex=(index+slides.length)%slides.length;
    slides.forEach((slide,slideIndex)=>{slide.hidden=slideIndex!==activeIndex});
    current.textContent=String(activeIndex+1).padStart(2,'0');
  };
  previous.addEventListener('click',()=>showSlide(activeIndex-1));
  next.addEventListener('click',()=>showSlide(activeIndex+1));
  carousel.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();showSlide(activeIndex-1)}
    if(event.key==='ArrowRight'){event.preventDefault();showSlide(activeIndex+1)}
  });
  showSlide(0);
});
window.addEventListener('load',syncTimelineHeight);
window.addEventListener('resize',syncTimelineHeight);
document.querySelectorAll('.timeline img').forEach(image=>image.addEventListener('load',syncTimelineHeight));
const atelierServicesToggle=document.querySelector('.atelier-services-toggle');
const atelierServicesContent=document.getElementById('atelier-services-content');
if(atelierServicesToggle&&atelierServicesContent){
  atelierServicesToggle.addEventListener('click',()=>{
    const isOpen=atelierServicesToggle.getAttribute('aria-expanded')==='true';
    atelierServicesToggle.setAttribute('aria-expanded',String(!isOpen));
    atelierServicesContent.hidden=isOpen;
    atelierServicesContent.classList.toggle('is-open',!isOpen);
  });
}
const atelierPhilosophyToggle=document.querySelector('.atelier-philosophy-toggle');
const atelierPhilosophyContent=document.getElementById('atelier-philosophy-content');
if(atelierPhilosophyToggle&&atelierPhilosophyContent){
  atelierPhilosophyToggle.addEventListener('click',()=>{
    const isOpen=atelierPhilosophyToggle.getAttribute('aria-expanded')==='true';
    atelierPhilosophyToggle.setAttribute('aria-expanded',String(!isOpen));
    atelierPhilosophyContent.hidden=isOpen;
    atelierPhilosophyContent.classList.toggle('is-open',!isOpen);
  });
}
const processToggle=document.querySelector('.process-toggle');
const processContent=document.getElementById('process-content');
processToggle.addEventListener('click',()=>{
  const isOpen=processToggle.getAttribute('aria-expanded')==='true';
  processToggle.setAttribute('aria-expanded',String(!isOpen));
  processContent.hidden=isOpen;
  processContent.classList.toggle('is-open',!isOpen);
});
const principlesToggle=document.querySelector('.principles-toggle');
const principlesContent=document.getElementById('principles-content');
principlesToggle.addEventListener('click',()=>{
  const isOpen=principlesToggle.getAttribute('aria-expanded')==='true';
  principlesToggle.setAttribute('aria-expanded',String(!isOpen));
  principlesContent.hidden=isOpen;
  principlesContent.classList.toggle('is-open',!isOpen);
});
const lightbox=document.getElementById('image-lightbox');
const lightboxImage=lightbox.querySelector('img');
const lightboxCaption=lightbox.querySelector('figcaption');
const lightboxClose=lightbox.querySelector('.lightbox-close');
const lightboxPrevious=lightbox.querySelector('.lightbox-prev');
const lightboxNext=lightbox.querySelector('.lightbox-next');
const projectImages=[...document.querySelectorAll('.projects .project-image img,.projects .project-gallery img,.timeline-project-drawings img')];
const pageLanguage=document.documentElement.lang.toLowerCase();
const enlargeImageLabel=pageLanguage.startsWith('en')?'Enlarge image':pageLanguage.startsWith('fr')?'Agrandir l’image':'Ampliar imagem';
let lastImageTrigger=null;
let lightboxGallery=[];
let lightboxIndex=0;
let lightboxBackgroundState=[];
const setLightboxBackgroundInert=inert=>{
  if(inert){
    lightboxBackgroundState=[...document.body.children]
      .filter(element=>element!==lightbox&&element.tagName!=='SCRIPT')
      .map(element=>[element,element.inert]);
    lightboxBackgroundState.forEach(([element])=>{element.inert=true});
    return;
  }
  lightboxBackgroundState.forEach(([element,wasInert])=>{element.inert=wasInert});
  lightboxBackgroundState=[];
};
const lightboxFocusableElements=()=>[...lightbox.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')]
  .filter(element=>!element.closest('[hidden]'));
const imageCaption=image=>image.closest('figure')?.querySelector('figcaption')?.textContent.trim()||image.closest('.project-feature')?.querySelector('h2')?.textContent.trim()||image.alt;
const galleryForImage=image=>{
  const carousel=image.closest('.zenith-carousel');
  if(carousel)return [...carousel.querySelectorAll('.zenith-slide img')];
  const drawingGrid=image.closest('.drawing-grid');
  if(drawingGrid)return [...drawingGrid.querySelectorAll('img')];
  const timelinePanel=image.closest('.timeline-project-drawings');
  if(timelinePanel)return [...timelinePanel.querySelectorAll('img')];
  const projectGallery=image.closest('.project-gallery');
  if(projectGallery){
    const previous=projectGallery.previousElementSibling;
    const featureImage=previous?.matches('.project-feature')?previous.querySelector('.project-image img'):null;
    return [...(featureImage?[featureImage]:[]),...projectGallery.querySelectorAll('img')];
  }
  const projectFeature=image.closest('.project-feature');
  if(projectFeature){
    const next=projectFeature.nextElementSibling;
    const related=next?.matches('.project-gallery')?[...next.querySelectorAll('img')]:[];
    return [image,...related];
  }
  return [image];
};
const showLightboxImage=index=>{
  if(!lightboxGallery.length)return;
  lightboxIndex=(index+lightboxGallery.length)%lightboxGallery.length;
  const image=lightboxGallery[lightboxIndex];
  lightboxImage.src=image.currentSrc||image.src;
  lightboxImage.alt=image.alt;
  lightboxCaption.textContent=imageCaption(image);
};
const openLightbox=(image,trigger=image)=>{
  lastImageTrigger=trigger;
  lightboxGallery=galleryForImage(image);
  lightboxIndex=Math.max(0,lightboxGallery.indexOf(image));
  const hasGallery=lightboxGallery.length>1;
  lightboxPrevious.hidden=!hasGallery;
  lightboxNext.hidden=!hasGallery;
  showLightboxImage(lightboxIndex);
  lightbox.hidden=false;
  document.body.classList.add('lightbox-open');
  setLightboxBackgroundInert(true);
  lightboxClose.focus();
};
const closeLightbox=()=>{
  lightbox.hidden=true;
  document.body.classList.remove('lightbox-open');
  setLightboxBackgroundInert(false);
  lightboxImage.src='';
  lightboxGallery=[];
  lightboxPrevious.hidden=true;
  lightboxNext.hidden=true;
  lastImageTrigger?.focus();
};
window.addEventListener('pageshow',()=>{
  if(lightbox.hidden){
    document.body.classList.remove('lightbox-open');
    setLightboxBackgroundInert(false);
  }
});
projectImages.forEach(image=>{
  const trigger=image.closest('.drawing-lightbox-trigger')||image;
  if(trigger===image){image.tabIndex=0;image.setAttribute('role','button')}
  trigger.setAttribute('aria-label',`${enlargeImageLabel}: ${imageCaption(image)}`);
  trigger.addEventListener('click',()=>openLightbox(image,trigger));
  if(trigger===image){
    image.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();openLightbox(image,image)}
    });
  }
});
lightboxClose.addEventListener('click',closeLightbox);
lightboxPrevious.addEventListener('click',()=>showLightboxImage(lightboxIndex-1));
lightboxNext.addEventListener('click',()=>showLightboxImage(lightboxIndex+1));
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});
document.addEventListener('keydown',event=>{
  if(lightbox.hidden)return;
  if(event.key==='Escape'){
    event.preventDefault();
    closeLightbox();
    return;
  }
  if(event.key==='Tab'){
    const focusable=lightboxFocusableElements();
    const first=focusable[0];
    const last=focusable[focusable.length-1];
    if(event.shiftKey&&(document.activeElement===first||!lightbox.contains(document.activeElement))){
      event.preventDefault();
      last?.focus();
    }else if(!event.shiftKey&&(document.activeElement===last||!lightbox.contains(document.activeElement))){
      event.preventDefault();
      first?.focus();
    }
    return;
  }
  if(event.key==='ArrowLeft'&&lightboxGallery.length>1){event.preventDefault();showLightboxImage(lightboxIndex-1)}
  if(event.key==='ArrowRight'&&lightboxGallery.length>1){event.preventDefault();showLightboxImage(lightboxIndex+1)}
});
