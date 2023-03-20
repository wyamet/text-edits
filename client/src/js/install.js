const butInstall = document.getElementById("buttonInstall");

const beforeInstallPromptHandler = (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
};

const installButtonClickHandler = async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.toggle("hidden", true);
};

const appInstalledHandler = (event) => {
  window.deferredPrompt = null;
};

window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
butInstall.addEventListener("click", installButtonClickHandler);
window.addEventListener("appinstalled", appInstalledHandler);
