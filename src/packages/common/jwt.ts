class JWT {
    /** 
     * Handles jwtoken 
     */
    private secret: string = 'mysecrete'

    sign = async (_id: string, _email: string): Promise<String> => {
        // sign token string
        return ""
    }
    verify = async (_token: string): Promise<String> => {
        // verify
        return ""
    }
}

// create jwt middleware here
