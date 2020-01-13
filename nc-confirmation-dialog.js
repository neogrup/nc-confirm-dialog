import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/neon-animation/neon-animations.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';

class NcConfirmationDialog extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
  static get template() {
    return html`
      <style>
        paper-dialog {
          width: 400px;
        }

        .header {
          margin-top: 0px;
          @apply --layout-horizontal;
          @apply --layout-center;
        }

        iron-icon {
          margin-right: 12px;
        }
        
        .buttons {
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-center-justified;
        }

        paper-button{
          margin: 10px 5px;
          background-color: var(--app-secondary-color);
          color: white;
        }
      </style>

      <paper-dialog id="confirmationDialog" modal dialog>
        <div class="header">
          <iron-icon icon="{{dialogIcon}}"></iron-icon><h3>{{localize(dialogTitle)}}</h3>
        </div>
        <div class="content">
          <!-- TODO: subtitle -->
        </div>
        <div class="buttons">
          <paper-button raised on-tap="_decline" style="background-color: #F44336;margin-right: 10px;">{{localize(dialogDeclineButtonTitle)}}</paper-button>
          <paper-button raised on-tap="_confirm">{{localize(dialogConfirmButtonTitle)}}</paper-button>
        </div>
      </paper-dialog>
    `;
  }

  static get properties() {
    return {
      language: {
        type: String
      },
      urlTranslate: String,
      dialogOrigin: String,
      dialogIcon: String,
      dialogTitle: String,
      dialogConfirmButtonTitle: String,
      dialogDeclineButtonTitle: String,
      // Product, ticket, etc.
      dialogDataAux: {
        type: Object,
        value: {}
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.useKeyIfMissing = true;
    this.loadResources(this.resolveUrl(this.urlTranslate));
  }

  open(){
    this.$.confirmationDialog.open();
  }

  _confirm(){
    this.$.confirmationDialog.close();
    this.dispatchEvent(new CustomEvent('confirm', {detail: {origin: this.dialogOrigin, dataAux: this.dialogDataAux}, bubbles: true, composed: true }));
  }

  _decline(){
    this.$.confirmationDialog.close();
    this.dispatchEvent(new CustomEvent('decline', {detail: {origin: this.dialogOrigin, dataAux: this.dialogDataAux}, bubbles: true, composed: true }));
  }
}

window.customElements.define('nc-confirmation-dialog', NcConfirmationDialog);
