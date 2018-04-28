import IIrCommandAsset from './IIrCommandAsset';

const NEC_RE0201:IIrCommandAsset = require('../assets/NEC_RE0201');

type Commands = {
    [key: string]: IIrCommandAsset
}

class IrCommand { 
    private commands: Commands = {
        NEC_RE0201
    };

    get(device: string, command: string): any { 
        if (this.commands[device] == null) { 
            throw new Error(`${device} is not found in devices`);
        }
        if (this.commands[device][command] == null) { 
            throw new Error(`${command} is not found in ${device}`);
        }
        return this.commands[device][command];
    }
}

export default new IrCommand();