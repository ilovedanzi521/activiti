package com.win.dfas.bpm.api;

import java.io.Serializable;

public interface PluginContext extends Serializable {
    String PLUGINCONTEXT = "PluginContext";

    Class<? extends RunTimePlugin> getPluginClass();

    BpmPluginDef getBpmPluginDef();

    String getTitle();
}
