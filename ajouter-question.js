document.getElementById('add-proposition').addEventListener('click', () => {
  const div = document.createElement('div');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Texte de la proposition';

  div.appendChild(checkbox);
  div.appendChild(input);
  document.getElementById('propositions').appendChild(div);
});

document.getElementById('form-question').addEventListener('submit', function(e) {
  e.preventDefault();

  const proprietaire = document.getElementById('proprietaire').value;
  const nomExamen    = document.getElementById('nom-examen').value;
  const enonce       = document.getElementById('enonce').value;
  const duree        = document.getElementById('duree-question').value;
  const points       = document.getElementById('points').value;

  const propositions = [];
  document.querySelectorAll('#propositions div').forEach(div => {
    const texte    = div.querySelector('input[type="text"]').value;
    const correcte = div.querySelector('input[type="checkbox"]').checked;
    propositions.push({ texte, correcte });
  });

  const key   = 'examens_' + proprietaire;
  const exams = JSON.parse(localStorage.getItem(key)) || [];
  const exam  = exams.find(ex => ex.nom === nomExamen);

  if (!exam) {
    alert("Examen introuvable !");
    return;
  }

  exam.questions.push({ enonce, duree, points, propositions });
  localStorage.setItem(key, JSON.stringify(exams));

  alert('Question ajoutée avec succès !');
  this.reset();
  document.getElementById('propositions').innerHTML = '';
});