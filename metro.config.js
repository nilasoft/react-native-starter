const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts}
  } = await getDefaultConfig();
  return {
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      minifierConfig: {
        keep_classnames: true, // Preserve class names
        keep_fnames: true, // Preserve function names
        mangle: {
          keep_classnames: true, // Preserve class names
          keep_fnames: true // Preserve function names
        }
      }
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  };
})();
