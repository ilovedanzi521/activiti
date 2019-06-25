package com.win.dfas.bpm.api;

public interface RunTimePlugin<S, M, R> {
    R execute(S var1, M var2);
}
