import { SharedComponentsModule } from './shared-components.module';

describe('SharedComponentsModule', () => {
  let sharedComponentsModule: SharedComponentsModule;

  beforeEach(() => {
    sharedComponentsModule = new SharedComponentsModule();
  });

  it('deve criar a instância', () => {
    expect(sharedComponentsModule).toBeTruthy();
  });
});
