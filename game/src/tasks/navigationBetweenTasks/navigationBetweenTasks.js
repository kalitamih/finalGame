export default function navigationTaskByKeyboard() {
  let indexSelectedTask = 0;
  const selected = document.getElementsByClassName('select');
  selected[indexSelectedTask].classList.add('selected');

  function selectNotificationByKeyboards(key) {
    if (key.code === 'ArrowUp') {
      selected[indexSelectedTask].classList.remove('selected');
      indexSelectedTask += 1;
      indexSelectedTask %= selected.length;
    }
    if (key.code === 'ArrowDown') {
      selected[indexSelectedTask].classList.remove('selected');
      indexSelectedTask -= 1;
    }
    if (indexSelectedTask < 0) {
      indexSelectedTask = selected.length - 1;
    }
    selected[indexSelectedTask].classList.add('selected');
  }
  document.addEventListener('keydown', selectNotificationByKeyboards);
}
