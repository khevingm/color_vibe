import * as vscode from "vscode";

const config = vscode.workspace.getConfiguration();
const target = vscode.workspace.workspaceFolders
  ? vscode.ConfigurationTarget.Workspace
  : vscode.ConfigurationTarget.Global;
const coloresPredefinidos = [
  { label: "Default", value: "#191919" },
  { label: "JavaScript", value: "#F7DF1E" },
  { label: "TypeScript", value: "#3178C6" },
  { label: "Node Js", value: "#539E43" },
  { label: "React Js", value: "#187388" },
  { label: "Angular", value: "#E23237" },
  { label: "Vue Js", value: "#448668" },
  { label: "Astro", value: "#FF5D01" },
  { label: "🎨 Customize color...", value: "custom" },
];

let originalColors: any;
export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("workbench");
  originalColors = config.get("colorCustomizations");

  // Aplicar cambios
  config.update(
    "colorCustomizations",
    {},
    vscode.ConfigurationTarget.Workspace
  );

  let comandAllBars = vscode.commands.registerCommand(
    "mi-extension.cambiarColorTodasLasBarras",
    async () => {
      await elegirColor();
    }
  );

  let comandLateralBar = vscode.commands.registerCommand(
    "mi-extension.cambiarColorBarraLateral",
    async () => {
      await barraLateralColor();
    }
  );
  let comandSuperiorBar = vscode.commands.registerCommand(
    "mi-extension.cambiarColorBarraSuperior",
    async () => {
      await barraSuperiorColor();
    }
  );
  let comandInferiorBar = vscode.commands.registerCommand(
    "mi-extension.cambiarColorBarraInferior",
    async () => {
      await barraInferiorColor();
    }
  );

  context.subscriptions.push(
    comandAllBars,
    comandLateralBar,
    comandSuperiorBar,
    comandInferiorBar
  );
}

export function deactivate() {
  const config = vscode.workspace.getConfiguration("workbench");
  config.update(
    "colorCustomizations",
    {},
    vscode.ConfigurationTarget.Workspace
  );
}

async function elegirColor() {
  const barColor = await vscode.window.showQuickPick(coloresPredefinidos, {
    placeHolder: "Selecciona un color para la barra superior e inferior",
  });
  if (!barColor) {
    return;
  } // Si el usuario cancela
  let selectCustomize = false;
  let barHex = barColor.value;

  if (barHex === "custom") {
    barHex =
      (await vscode.window.showInputBox({
        prompt: "Introduce un color HEX para la barra superior",
        value: "#ff0000",
        ignoreFocusOut: true,
      })) || "#ff0000";
    selectCustomize = true;
  }

  const selectColortext = async () => {
    if (!selectCustomize) {
      return "#ECE7F4";
    }

    if (selectCustomize) {
      let textBarHex =
        (await vscode.window.showInputBox({
          prompt: "Introduce un color HEX para la barra superior e inferior",
          value: "#ffffff",
          ignoreFocusOut: true,
        })) || "#ff0000";

      return textBarHex;
    }
  };

  const textColor = await selectColortext();

  // Aplicar los colores seleccionados
  if (barColor.label === "Default") {
    await config.update("workbench.colorCustomizations", {}, target);
  } else {
    await config.update(
      "workbench.colorCustomizations",
      {
        "titleBar.activeBackground": barHex,
        "titleBar.inactiveBackground": barHex,
        "titleBar.activeForeground":
          barHex === "#F7DF1E" ? "#191919" : textColor,
        "titleBar.inactiveForeground":
          barHex === "#F7DF1E" ? "#191919" : textColor,
        "statusBar.foreground": barHex === "#F7DF1E" ? "#191919" : textColor,
        "statusBar.background": barHex,
        "activityBar.background": barHex,
        "activityBar.inactiveForeground":
          barHex === "#F7DF1E" ? "#191919" : textColor,
        "activityBarBadge.background":
          barHex === "#F7DF1E" ? "#808080" : "#7a7a7a",
        "activityBarBadge.foreground": "#ffffff",
        "activityBar.activeBorder": "#3f424b",
        "activityBar.activeBackground": "#3f424b",
        "activityBar.foreground": "#ffffff",
      },
      target
    );
  }

  // NUEVO: Verificar si el esquema de la barra superior es nativo y advertir al usuario
  const windowConfig = vscode.workspace.getConfiguration("window");
  if (windowConfig.get("titleBarStyle") === "native") {
    vscode.window.showWarningMessage(
      'Para visualizar los cambios en la barra superior, cambia "window.titleBarStyle" a "custom" en la configuración.'
    );
  }

  vscode.window.showInformationMessage("🎨 ¡Colores actualizados con éxito!");
}

export async function barraLateralColor() {
  const barColor = await vscode.window.showQuickPick(coloresPredefinidos, {
    placeHolder: "Selecciona un color para la barra lateral",
  });

  if (!barColor) {
    return;
  }
  let selectCustomize = false;
  let barHex = barColor.value;

  if (barHex === "custom") {
    barHex =
      (await vscode.window.showInputBox({
        prompt: "Introduce un color HEX para la barra superior",
        value: "#ff0000",
        ignoreFocusOut: true,
      })) || "#ff0000";
    selectCustomize = true;
  }

  const selectColortext = async () => {
    if (!selectCustomize) {
      return "#ECE7F4";
    }
    if (selectCustomize) {
      let textBarHex =
        (await vscode.window.showInputBox({
          prompt: "Introduce un color HEX para la barra superior e inferior",
          value: "#ffffff",
          ignoreFocusOut: true,
        })) || "#ff0000";

      return textBarHex;
    }
  };

  const textColor = await selectColortext();

  if (barColor.label === "Default") {
    await config.update("workbench.colorCustomizations", {}, target);
  } else {
    config.update(
      "workbench.colorCustomizations",
      {
        "activityBar.background": barHex,
        "activityBar.inactiveForeground":
          barHex === "#F7DF1E" ? "#191919" : textColor,
        "activityBarBadge.background":
          barHex === "#F7DF1E" ? "#808080" : "#7a7a7a",
        "activityBarBadge.foreground": "#ffffff",
        "activityBar.activeBorder": "#3f424b",
        "activityBar.activeBackground": "#3f424b",
        "activityBar.foreground": "#ffffff",
      },
      target
    );
  }
  vscode.window.showInformationMessage(
    "🎨 ¡Colores de la barra lateral actualizados con éxito!"
  );
}

export async function barraSuperiorColor() {
  const barColor = await vscode.window.showQuickPick(coloresPredefinidos, {
    placeHolder: "Selecciona un color para la barra lateral",
  });

  if (!barColor) {
    return;
  }
  let barHex = barColor.value;
  let selectCustomize = false;

  if (barHex === "custom") {
    barHex =
      (await vscode.window.showInputBox({
        prompt: "Introduce un color HEX para la barra superior",
        value: "#ff0000",
        ignoreFocusOut: true,
      })) || "#ff0000";
    selectCustomize = true;
  }

  const selectColortext = async () => {
    if (!selectCustomize) {
      return "#ECE7F4";
    }
    if (selectCustomize) {
      let textBarHex =
        (await vscode.window.showInputBox({
          prompt: "Introduce un color HEX para la barra superior e inferior",
          value: "#ffffff",
          ignoreFocusOut: true,
        })) || "#ff0000";

      return textBarHex;
    }
  };

  const textColor = await selectColortext();
  if (barColor.label === "Default") {
    await config.update("workbench.colorCustomizations", {}, target);
  } else {
    config.update(
      "workbench.colorCustomizations",
      {
        "titleBar.activeBackground": barHex,
        "titleBar.inactiveBackground": barHex,
        "titleBar.activeForeground":
          barHex === "#F7DF1E" ? "#191919" : textColor,
        "titleBar.inactiveForeground":
          barHex === "#F7DF1E" ? "#191919" : textColor,
      },
      target
    );
  }
  vscode.window.showInformationMessage(
    "🎨 ¡Colores de la barra Superior actualizado con éxito!"
  );
}
export async function barraInferiorColor() {
  const barColor = await vscode.window.showQuickPick(coloresPredefinidos, {
    placeHolder: "Selecciona un color para la barra inferior",
  });

  if (!barColor) {
    return;
  }
  let barHex = barColor.value;

  let selectCustomize = false;
  if (barHex === "custom") {
    barHex =
      (await vscode.window.showInputBox({
        prompt: "Introduce un color HEX para la barra superior",
        value: "#ff0000",
        ignoreFocusOut: true,
      })) || "#ff0000";
    selectCustomize = true;
  }
  const selectColortext = async () => {
    if (!selectCustomize) {
      return "#ECE7F4";
    }
    if (selectCustomize) {
      let textBarHex =
        (await vscode.window.showInputBox({
          prompt: "Introduce un color HEX para la barra inferior",
          value: "#ffffff",
          ignoreFocusOut: true,
        })) || "#ff0000";

      return textBarHex;
    }
  };

  const textColor = await selectColortext();
  if (barColor.label === "Default") {
    await config.update("workbench.colorCustomizations", {}, target);
  } else {
    config.update(
      "workbench.colorCustomizations",
      {
        "statusBar.foreground": barHex === "#F7DF1E" ? "#191919" : textColor,
        "statusBar.background": barHex,
      },
      target
    );
  }
  vscode.window.showInformationMessage(
    "🎨 ¡Colores de la barra inferior actualizado con éxito!"
  );
}
