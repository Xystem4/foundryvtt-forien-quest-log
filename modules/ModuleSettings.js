import Utils                                 from './control/Utils.js';
import { constants, noteControls, settings } from './model/constants.js';

const s_QUEST_TRACKER_DEFAULT = { top: 80 };

const scope = {
   client: 'client',
   world: 'world'
};

export default class ModuleSettings
{
   /**
    * Registers various configuration settings for Module
    */
   static register()
   {
      game.settings.register(constants.moduleName, settings.availableQuests, {
         name: 'ForienQuestLog.Settings.availableQuests.Enable',
         hint: 'ForienQuestLog.Settings.availableQuests.EnableHint',
         scope: scope.world,
         config: true,
         default: false,
         type: Boolean,
         onChange: () =>
         {
            const fqlPublicAPI = Utils.getFQLPublicAPI();
            if (fqlPublicAPI.questLog.rendered) { fqlPublicAPI.questLog.render(); }
         }
      });

      game.settings.register(constants.moduleName, settings.allowPlayersDrag, {
         name: 'ForienQuestLog.Settings.allowPlayersDrag.Enable',
         hint: 'ForienQuestLog.Settings.allowPlayersDrag.EnableHint',
         scope: scope.world,
         config: true,
         default: false,
         type: Boolean,
         onChange: () =>
         {
            Utils.getFQLPublicAPI().renderAll({ force: true, questPreview: true });
         }
      });

      game.settings.register(constants.moduleName, settings.allowPlayersCreate, {
         name: 'ForienQuestLog.Settings.allowPlayersCreate.Enable',
         hint: 'ForienQuestLog.Settings.allowPlayersCreate.EnableHint',
         scope: scope.world,
         config: true,
         default: false,
         type: Boolean,
         onChange: () =>
         {
            const fqlPublicAPI = Utils.getFQLPublicAPI();
            if (fqlPublicAPI.questLog.rendered) { fqlPublicAPI.questLog.render(); }
         }
      });

      game.settings.register(constants.moduleName, settings.allowPlayersAccept, {
         name: 'ForienQuestLog.Settings.allowPlayersAccept.Enable',
         hint: 'ForienQuestLog.Settings.allowPlayersAccept.EnableHint',
         scope: scope.world,
         config: true,
         default: false,
         type: Boolean,
         onChange: () =>
         {
            const fqlPublicAPI = Utils.getFQLPublicAPI();
            if (fqlPublicAPI.questLog.rendered) { fqlPublicAPI.questLog.render(); }
         }
      });

      game.settings.register(constants.moduleName, settings.countHidden, {
         name: 'ForienQuestLog.Settings.countHidden.Enable',
         hint: 'ForienQuestLog.Settings.countHidden.EnableHint',
         scope: scope.world,
         config: true,
         default: true,
         type: Boolean,
         onChange: () => { Utils.getFQLPublicAPI().renderAll(); }
      });

      game.settings.register(constants.moduleName, settings.dynamicBookmarkBackground, {
         name: 'ForienQuestLog.Settings.dynamicBookmarkBackground.Enable',
         hint: 'ForienQuestLog.Settings.dynamicBookmarkBackground.EnableHint',
         scope: scope.world,
         config: true,
         default: true,
         type: Boolean,
         onChange: () =>
         {
            const fqlPublicAPI = Utils.getFQLPublicAPI();
            if (fqlPublicAPI.questLog.rendered) { fqlPublicAPI.questLog.render(); }
         }
      });

      game.settings.register(constants.moduleName, settings.navStyle, {
         name: 'ForienQuestLog.Settings.navStyle.Enable',
         hint: 'ForienQuestLog.Settings.navStyle.EnableHint',
         scope: scope.client,
         config: true,
         default: 'bookmarks',
         type: String,
         choices: {
            bookmarks: 'ForienQuestLog.Settings.navStyle.bookmarks',
            classic: 'ForienQuestLog.Settings.navStyle.classic'
         },
         onChange: () =>
         {
            const fqlPublicAPI = Utils.getFQLPublicAPI();
            if (fqlPublicAPI.questLog.rendered) { fqlPublicAPI.questLog.render(); }
         }
      });

      game.settings.register(constants.moduleName, settings.showTasks, {
         name: 'ForienQuestLog.Settings.showTasks.Enable',
         hint: 'ForienQuestLog.Settings.showTasks.EnableHint',
         scope: scope.world,
         config: true,
         default: 'default',
         type: String,
         choices: {
            default: 'ForienQuestLog.Settings.showTasks.default',
            onlyCurrent: 'ForienQuestLog.Settings.showTasks.onlyCurrent',
            no: 'ForienQuestLog.Settings.showTasks.no'
         },
         onChange: () => { Utils.getFQLPublicAPI().renderAll(); }
      });

      game.settings.register(constants.moduleName, settings.defaultPermission, {
         name: 'ForienQuestLog.Settings.defaultPermissionLevel.Enable',
         hint: 'ForienQuestLog.Settings.defaultPermissionLevel.EnableHint',
         scope: scope.world,
         config: true,
         default: 'Observer',
         type: String,
         choices: {
            OBSERVER: 'ForienQuestLog.Settings.defaultPermissionLevel.OBSERVER',
            NONE: 'ForienQuestLog.Settings.defaultPermissionLevel.NONE',
            OWNER: 'ForienQuestLog.Settings.defaultPermissionLevel.OWNER'
         }
      });

      game.settings.register(constants.moduleName, settings.hideFQLFromPlayers, {
         name: 'ForienQuestLog.Settings.hideFQLFromPlayers.Enable',
         hint: 'ForienQuestLog.Settings.hideFQLFromPlayers.EnableHint',
         scope: scope.world,
         config: true,
         default: false,
         type: Boolean,
         onChange: (value) =>
         {
            const fqlPublicAPI = Utils.getFQLPublicAPI();

            if (Utils.isQuestTrackerVisible())
            {
               fqlPublicAPI.questTracker.render(true, { focus: true });
            }
            else
            {
               fqlPublicAPI.questTracker.close();
            }

            if (!game.user.isGM)
            {
               // Hide all FQL windows from non GM user and remove the ui.controls for FQL.
               if (value)
               {
                  fqlPublicAPI.closeAll({ questPreview: true });

                  const notes = ui.controls.controls.find((c) => c.name === 'notes');
                  if (notes) { notes.tools = notes.tools.filter((c) => !c.name.startsWith(constants.moduleName)); }
               }
               else  // Add back ui.controls
               {
                  const notes = ui.controls.controls.find((c) => c.name === 'notes');
                  if (notes) { notes.tools.push(...noteControls); }
               }

               ui.controls.render(true);
            }

            game.journal.render();
         }
      });

      game.settings.register(constants.moduleName, settings.notifyRewardDrop, {
         name: 'ForienQuestLog.Settings.notifyRewardDrop.Enable',
         hint: 'ForienQuestLog.Settings.notifyRewardDrop.EnableHint',
         scope: scope.world,
         config: true,
         default: false,
         type: Boolean,
      });

      game.settings.register(constants.moduleName, settings.showFolder, {
         name: 'ForienQuestLog.Settings.showFolder.Enable',
         hint: 'ForienQuestLog.Settings.showFolder.EnableHint',
         scope: scope.world,
         config: true,
         default: false,
         type: Boolean,
         onChange: () => game.journal.render()
      });

      game.settings.register(constants.moduleName, settings.questTrackerPosition, {
         scope: scope.client,
         config: false,
         default: s_QUEST_TRACKER_DEFAULT,
      });

      game.settings.register(constants.moduleName, settings.enableQuestTracker, {
         name: 'ForienQuestLog.WorkshopPUF.Settings.enableQuestTracker.name',
         hint: 'ForienQuestLog.WorkshopPUF.Settings.enableQuestTracker.hint',
         scope: scope.client,
         config: true,
         default: false,
         type: Boolean,
         onChange: () =>
         {
            if (Utils.isQuestTrackerVisible())
            {
               Utils.getFQLPublicAPI().questTracker.render(true, { focus: true });
            }
            else
            {
               Utils.getFQLPublicAPI()?.questTracker.close();
            }
         }
      });

      game.settings.register(constants.moduleName, settings.questTrackerBackground, {
         name: 'ForienQuestLog.WorkshopPUF.Settings.questTrackerBackground.name',
         hint: 'ForienQuestLog.WorkshopPUF.Settings.questTrackerBackground.hint',
         scope: scope.client,
         config: true,
         default: true,
         type: Boolean,
         onChange: (value) =>
         {
            if (Utils.getFQLPublicAPI()?.questTracker.rendered)
            {
               Utils.getFQLPublicAPI().questTracker.element.toggleClass('background', value);
            }
         }
      });

      game.settings.register(constants.moduleName, settings.questTrackerTasks, {
         name: 'ForienQuestLog.WorkshopPUF.Settings.questTrackerTasks.name',
         hint: 'ForienQuestLog.WorkshopPUF.Settings.questTrackerTasks.hint',
         scope: scope.client,
         config: true,
         default: true,
         type: Boolean,
         onChange: () =>
         {
            const fqlPublicAPI = Utils.getFQLPublicAPI();
            if (fqlPublicAPI.questTracker.rendered) { fqlPublicAPI.questTracker.render(); }
         }
      });

      game.settings.register(constants.moduleName, settings.resetQuestTracker, {
         name: 'ForienQuestLog.WorkshopPUF.Settings.resetQuestTracker.name',
         hint: 'ForienQuestLog.WorkshopPUF.Settings.resetQuestTracker.hint',
         scope: scope.client,
         config: true,
         default: false,
         type: Boolean,
         onChange: (value) =>
         {
            if (value)
            {
               game.settings.set(constants.moduleName, settings.questTrackerPosition, s_QUEST_TRACKER_DEFAULT);
               game.settings.set(constants.moduleName, settings.resetQuestTracker, false);
               if (Utils.getFQLPublicAPI()?.questTracker.rendered)
               {
                  Utils.getFQLPublicAPI().questTracker.render();
               }
            }
         }
      });
   }
}
